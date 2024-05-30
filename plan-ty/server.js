const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Mock database data for existing plants
let mockTemplates = [
  {
    id: 1,
    name: 'Peppers',
    parameters: [
      { type: 'waterTemperature', min: 15, warningMin: 18, warningMax: 25, max: 28 },
      { type: 'waterPh', min: 6, warningMin: 6.5, warningMax: 7.5, max: 8 },
      { type: 'waterConductivity', min: 0.5, warningMin: 1, warningMax: 2.5, max: 3 },
      { type: 'waterFlow', min: 0.1, warningMin: 0.2, warningMax: 1.5, max: 2 },
      { type: 'waterLevel', min: 5, warningMin: 6, warningMax: 10, max: 12 },
      { type: 'airTemperature', min: 18, warningMin: 20, warningMax: 25, max: 30 },
      { type: 'airHumidity', min: 30, warningMin: 35, warningMax: 60, max: 70 },
      { type: 'airCo2', min: 300, warningMin: 350, warningMax: 600, max: 800 },
      { type: 'vpd', min: 0.8, warningMin: 0.9, warningMax: 1.2, max: 1.3 },
      { type: 'dewPoint', min: 10, warningMin: 12, warningMax: 18, max: 20 },
      { type: 'lightLevel', min: 300, warningMin: 400, warningMax: 800, max: 1000 }
    ]
  },
  {
    id: 2,
    name: 'Potatoes',
    parameters: [
      { type: 'waterTemperature', min: 15, warningMin: 18, warningMax: 25, max: 28 },
      { type: 'waterPh', min: 6, warningMin: 6.5, warningMax: 7.5, max: 8 },
      { type: 'waterConductivity', min: 0.5, warningMin: 1, warningMax: 2.5, max: 3 },
      { type: 'waterFlow', min: 0.1, warningMin: 0.2, warningMax: 1.5, max: 2 },
      { type: 'waterLevel', min: 5, warningMin: 6, warningMax: 10, max: 12 },
      { type: 'airTemperature', min: 18, warningMin: 20, warningMax: 25, max: 30 },
      { type: 'airHumidity', min: 30, warningMin: 35, warningMax: 60, max: 70 },
      { type: 'airCo2', min: 300, warningMin: 350, warningMax: 600, max: 800 },
      { type: 'vpd', min: 0.8, warningMin: 0.9, warningMax: 1.2, max: 1.3 },
      { type: 'dewPoint', min: 10, warningMin: 12, warningMax: 18, max: 20 },
      { type: 'lightLevel', min: 300, warningMin: 400, warningMax: 800, max: 1000 }
    ]
  }
];

// Endpoint to get all templates
app.get('/api/templates', (req, res) => {
  res.json(mockTemplates);
});

// Endpoint to get a single template by ID
app.get('/api/templates/:id', (req, res) => {
  const templateId = parseInt(req.params.id);
  const template = mockTemplates.find(template => template.id === templateId);
  if (template) {
    res.json(template);
  } else {
    res.status(404).json({ error: 'Template not found' });
  }
});

// Endpoint to add a new template
app.post('/api/templates', (req, res) => {
  const newTemplate = {
    id: mockTemplates.length + 1,
    name: req.body.name,
    parameters: [
      { type: 'waterTemperature', min: 0, warningMin: 0, warningMax: 0, max: 0 },
      { type: 'waterPh', min: 0, warningMin: 0, warningMax: 0, max: 0 },
      { type: 'waterConductivity', min: 0, warningMin: 0, warningMax: 0, max: 0 },
      { type: 'waterFlow', min: 0, warningMin: 0, warningMax: 0, max: 0 },
      { type: 'waterLevel', min: 0, warningMin: 0, warningMax: 0, max: 0 },
      { type: 'airTemperature', min: 0, warningMin: 0, warningMax: 0, max: 0 },
      { type: 'airHumidity', min: 0, warningMin: 0, warningMax: 0, max: 0 },
      { type: 'airCo2', min: 0, warningMin: 0, warningMax: 0, max: 0 },
      { type: 'vpd', min: 0, warningMin: 0, warningMax: 0, max: 0 },
      { type: 'dewPoint', min: 0, warningMin: 0, warningMax: 0, max: 0 },
      { type: 'lightLevel', min: 0, warningMin: 0, warningMax: 0, max: 0 }
    ]
  };
  mockTemplates.push(newTemplate);
  res.json(newTemplate);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
