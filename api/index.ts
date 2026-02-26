import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

// BFF Dashboard endpoint
app.get('/api/dashboard', async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();
    const pendingShipments = await prisma.shipment.count({
      where: {
        status: {
          not: 'Delivered'
        }
      }
    });

    const deliveredToday = await prisma.order.count({
      where: {
        status: 'Delivered'
      }
    });

    const revenueResult = await prisma.order.aggregate({
      _sum: {
        total: true
      }
    });
    const totalRevenue = revenueResult._sum.total || 0;

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        id: 'desc'
      }
    });

    res.json({
      metrics: [
        {
          label: 'Total Orders',
          value: totalOrders.toLocaleString(),
          change: '+12%',
          trend: 'up',
          icon: 'list_alt'
        },
        {
          label: 'Pending Shipments',
          value: pendingShipments.toString(),
          change: '+5%',
          trend: 'up',
          icon: 'pending_actions'
        },
        {
          label: 'Delivered Today',
          value: deliveredToday.toString(),
          change: '-2%',
          trend: 'down',
          icon: 'check_circle'
        },
        {
          label: 'Revenue',
          value: `$${totalRevenue.toLocaleString()}`,
          change: '+8%',
          trend: 'up',
          icon: 'payments'
        }
      ],
      recentOrders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// --- Order CRUD ---

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = await prisma.order.create({
      data: req.body
    });
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.update({
      where: { id },
      data: req.body
    });
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// --- Shipment CRUD ---

app.get('/api/shipments', async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany();
    res.json(shipments);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).json({ error: 'Failed to fetch shipments' });
  }
});

app.post('/api/shipments', async (req, res) => {
  try {
    const shipment = await prisma.shipment.create({
      data: req.body
    });
    res.status(201).json(shipment);
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({ error: 'Failed to create shipment' });
  }
});

app.put('/api/shipments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await prisma.shipment.update({
      where: { id },
      data: req.body
    });
    res.json(shipment);
  } catch (error) {
    console.error('Error updating shipment:', error);
    res.status(500).json({ error: 'Failed to update shipment' });
  }
});

app.delete('/api/shipments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.shipment.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting shipment:', error);
    res.status(500).json({ error: 'Failed to delete shipment' });
  }
});

// --- AI Insights ---

app.post('/api/generate-insights', async (req, res) => {
  try {
    const { data } = req.body;
    const prompt = `Analyze this logistics data and provide 3 key insights in a concise bullet-point format:\n${JSON.stringify(data)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ insights: text });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`BFF server running on http://localhost:${port}`);
  });
}

export default app;
