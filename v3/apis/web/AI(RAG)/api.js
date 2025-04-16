require("dotenv").config();
const { Pinecone } = require("@pinecone-database/pinecone");
const OpenAI = require("openai");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { loadQAStuffChain } = require("langchain/chains");
const { Document } = require("langchain/document");
const LangchainOpenAI = require("@langchain/openai").OpenAI;

const { model } = require("../../../model/mainModel");
const { regix } = require("../../../helpers/regix");

const AIEndPoints = (app) => {
  app.get("/api/v3/ai", async (req, res) => {
    // const { query } = req.body;
    // console.log(query);
    try {
      const schedule = [
        {
          FuelConsumptionSchema: {
            ID: {
              databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
              validatePattern: regix.int,
            },
            Equipment_Type: {
              databaseType: "NVARCHAR(255)",
              validatePattern: regix.nvarChar255,
            },
            Equipment: {
              databaseType: "NVARCHAR(255)",
              validatePattern: regix.nvarChar255,
            },
            Quantity: {
              databaseType: "DECIMAL(8,2)",
              validatePattern: regix.decimal82,
            },
            Value: {
              databaseType: "DECIMAL(8,2)",
              validatePattern: regix.decimal82,
            },
          },
        },
      ];

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
      });

      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        batchSize: 100,
        model: "text-embedding-3-small",
      });

      const indexName = "bauer";

      const index = pc.index(indexName);

      const scheduleEmbeddings = await embeddings.embedDocuments(
        schedule.map((item) => JSON.stringify(item))
      );

      console.log("length of embeddings: " + scheduleEmbeddings.length);

      const scheduleVectors = scheduleEmbeddings.map((embedding, i) => ({
        id: `schedule_${i}`,
        values: embedding,
        metadata: {
          text: JSON.stringify(schedule[i]),
        },
      }));

      await index.upsert(scheduleVectors);

      const query =
        "create a graph for fuel consumption for each equipment as bar chart";

      const queryEmbedding = await new OpenAIEmbeddings().embedQuery(query);

      let queryResponse = await index.query({
        vector: queryEmbedding,
        topK: 3,
        includeMetadata: true,
      });

      const concatenatedText = queryResponse.matches
        .map((match) => match.metadata.text)
        .join(" ");

      console.log(`Concatenated Text: ${concatenatedText}`);

      const llm = new LangchainOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        // modelName: "gpt-4",
      });
      const chain = loadQAStuffChain(llm);

      const structuredPrompt = `You are an assistant that formats output strictly in JSON. 
        Given the schema and the user query, return a JSON object with the following structure:
        {
          "table": "table_name",
          "name": "graph_title",
          "X_Axis": "x_axis_field",
          "Y_Axis": ["y_axis_field_1", "y_axis_field_2"],
          "graphType": "Bar"
        }
        Schema: ${concatenatedText}
        Query: ${query}

        Respond with only the JSON object, no additional text.`;

      const result = await chain.invoke({
        input_documents: [new Document({ pageContent: concatenatedText })],
        question: structuredPrompt,
      });

      console.log(`Answer: ${result.text}`);

      // Attempt to parse a clean JSON structure
      let responsePayload = {};
      try {
        responsePayload = JSON.parse(result.text);
      } catch (error) {
        console.error("Error parsing JSON output:", error);
      }

      responsePayload = {
        table: responsePayload.table || "FuelConsumptionTable",
        name: responsePayload.name || "Fuel Consumption Graph",
        X_Axis: responsePayload.X_Axis || "Equipment",
        Y_Axis: responsePayload.Y_Axis || ["Quantity", "Value"],
        graphType: "Bar",
        xFontSize: "10",
        xFontWeight: "500",
        yFontSize: "10",
        yFontWeight: "500",
        tooltipFontSize: "10",
        tooltipFontWeight: "500",
        tooltips: ["Equipment_Type", "Quantity", "Value"],
        tooltipProps: [],
        width: "200px",
        height: "200px",
        top: 0,
        left: 0,
        Type: "Graph",
        operationType: "Count",
        cx: "50%",
        cy: "50%",
        isTooltip: true,
        isLegend: false,
        isLabel: false,
        props: "barProps",
        Colors: ["#8884d8", "#82ca9d"],
      };

      return res.status(200).json({
        message: queryResponse,
        result: result,
        graphConfig: responsePayload,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  });
  ////////////////////////////////////////////////////////////////////////////////////////////
  app.get("/api/v3/ai1", async (req, res) => {
    try {
      let schedule = [];

      Object.keys(model).map((item) => {
        if (item.includes("Schema")) {
          schedule.push({ [item]: model[item] });
        }
      });

      // schedule = schedule.slice(0, 9);
      // console.log(schedule);

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
      });

      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        batchSize: 100,
        model: "text-embedding-3-small",
      });

      const indexName = "bauer";

      const index = pc.index(indexName);

      const scheduleEmbeddings = await embeddings.embedDocuments(
        schedule.map((item) => JSON.stringify(item))
      );

      console.log("length of embeddings: " + scheduleEmbeddings.length);

      const scheduleVectors = scheduleEmbeddings.map((embedding, i) => ({
        id: `schedule_${i}`,
        values: embedding,
        metadata: {
          text: JSON.stringify(schedule[i]),
        },
      }));

      await index.upsert(scheduleVectors);

      const query =
        "create a graph for FuelConsumption for each equipment as bar chart";

      const queryEmbedding = await new OpenAIEmbeddings().embedQuery(query);
      console.log(queryEmbedding);

      let queryResponse = await index.query({
        vector: queryEmbedding,
        topK: 3,
        includeMetadata: true,
      });

      const concatenatedText = queryResponse.matches
        .map((match) => match.metadata.text)
        .join(" ");

      console.log(`Concatenated Text: ${concatenatedText}`);

      // const openai = new OpenAI({
      //   apiKey: process.env.OPENAI_API_KEY,
      // });

      // Define the output structure
      const functionSchema = {
        name: "generate_graph_config",
        description:
          "Generates a graph configuration for the Fuel Consumption schema.",
        parameters: {
          type: "object",
          properties: {
            table: {
              type: "string",
              description: "Name of the database table",
            },
            name: { type: "string", description: "Title of the graph" },
            X_Axis: { type: "string", description: "X-axis field" },
            Y_Axis: {
              type: "array",
              items: { type: "string" },
              description: "Y-axis fields",
            },
            graphType: {
              type: "string",
              enum: ["Bar", "Line", "Pie"],
              description: "Type of graph",
            },
          },
          required: ["table", "name", "X_Axis", "Y_Axis", "graphType"],
        },
      };

      // const query = "Create a bar chart for fuel consumption per equipment.";

      const response = await openai.chat.completions.create({
        model: "gpt-4", // Ensure you're using GPT-4
        messages: [
          {
            role: "system",
            content: "You are an AI that outputs JSON only.",
          },
          {
            role: "user",
            content: `Given the following schema, generate a valid JSON graph configuration:

Schema: ${concatenatedText}
Query: ${query}`,
          },
        ],
        functions: [functionSchema],
        function_call: { name: "generate_graph_config" },
      });

      // Parse structured output
      const responsePayload = response.choices[0].message.function_call
        .arguments
        ? JSON.parse(response.choices[0].message.function_call.arguments)
        : {};

      console.log("Graph Configuration:", responsePayload);
      return res.status(200).json({
        // model: model,
        message: queryResponse,
        // result: result,
        graphConfig: responsePayload,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.post("/api/v3/ai2", async (req, res) => {
    try {
      let schedule = [];

      // Collect all schemas
      Object.keys(model).forEach((item) => {
        if (item.includes("Schema")) {
          schedule.push({ [item]: model[item] });
        }
      });

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
      });

      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        batchSize: 100,
        model: "text-embedding-3-small",
      });

      const indexName = "bauer";
      const index = pc.index(indexName);

      // Embed and upsert only if necessary
      if (schedule.length) {
        const scheduleEmbeddings = await embeddings.embedDocuments(
          schedule.map((item) => JSON.stringify(item))
        );

        console.log("Embeddings length: ", scheduleEmbeddings.length);

        const scheduleVectors = scheduleEmbeddings.map((embedding, i) => ({
          id: `schedule_${i}`,
          values: embedding,
          metadata: { text: JSON.stringify(schedule[i]) },
        }));

        await index.upsert(scheduleVectors);
      }

      // User Query
      // const query =
      //   "create a graph for fuel consumption and prodcution per equipment";
      const { query } = req.body;
      const queryEmbedding = await embeddings.embedQuery(query);

      const queryResponse = await index.query({
        vector: queryEmbedding,
        topK: 5,
        includeMetadata: true,
      });

      const concatenatedText = queryResponse.matches
        .map((match) => match.metadata.text)
        .join(" ");

      console.log("Concatenated Text: ", concatenatedText);

      // Output structure for graph configuration
      const graphSchema = {
        name: "generate_graph_config",
        description:
          "Generates an array of JSON configurations for drawing multiple graphs based on a given schema and query.",
        parameters: {
          type: "object",
          properties: {
            graphs: {
              type: "array",
              description: "An array of graph configurations.",
              items: {
                type: "object",
                properties: {
                  table: {
                    type: "string",
                    description: "Name of the database table or tables",
                  },
                  name: { type: "string", description: "Title of the graph" },
                  X_Axis: { type: "string", description: "X-axis field" },
                  Y_Axis: {
                    type: "array",
                    description: "Y-axis fields",
                    items: {
                      type: "object",
                      properties: {
                        opType: {
                          type: "string",
                          description:
                            "The operation type for the tooltip (e.g., 'Count', 'Sum').",
                          enum: ["Count", "Sum", "Average"],
                        },
                        name: {
                          type: "string",
                          description:
                            "The name of the field to display in the Y_Axis. default value is column name",
                        },
                        col: {
                          type: "string",
                          description:
                            "The Column from which The Y_Axis Draw from table",
                        },
                      },
                    },
                  },
                  graphType: {
                    type: "string",
                    enum: ["Bar", "Line", "Pie"],
                    description: "Type of graph",
                  },
                  top: {
                    type: "string",
                    desription:
                      "the Top Position of the graph in the screen as percentage (e.g: top:10%)",
                  },
                  left: {
                    type: "string",
                    desription:
                      "the Left Position of the graph in the screen as percentage (e.g: left:10%)",
                  },
                  width: {
                    type: "string",
                    desription:
                      "the Width of the graph in the screen as percentage (e.g: width:10%)",
                  },
                  height: {
                    type: "string",
                    desription:
                      "the height of the graph in the screen as percentage (e.g: height:10%)",
                  },
                },
              },
            },
          },
          required: [
            "table",
            "name",
            "X_Axis",
            "Y_Axis",
            "graphType",
            "top",
            "left",
            "width",
            "height",
          ],
        },
      };

      const slicerSchema = {
        name: "generate_slicer_config",
        description:
          "Generates an array of JSON configurations for drawing multiple slicers based on a given schema and query.",
        parameters: {
          type: "object",
          properties: {
            graphs: {
              type: "array",
              description: "An array of graph configurations.",
              items: {
                type: "object",
                properties: {
                  table: {
                    type: "string",
                    description: "Name of the database table or tables",
                  },
                  name: { type: "string", description: "Title of the slicer" },
                  mainSlicer: {
                    type: "string",
                    description: "main slicer field",
                  },
                  subSlicers: {
                    type: "array",
                    description: "sub slicers fields",
                    items: {
                      type: "string",
                    },
                  },
                  slicerType: {
                    type: "string",
                    enum: ["Checks", "Date"],
                    description: "Type of Slicer",
                  },
                  top: {
                    type: "string",
                    desription:
                      "the Top Position of the graph in the screen as percentage (e.g: top:10%)",
                  },
                  left: {
                    type: "string",
                    desription:
                      "the Left Position of the graph in the screen as percentage (e.g: left:10%)",
                  },
                  width: {
                    type: "string",
                    desription:
                      "the Width of the graph in the screen as percentage (e.g: width:10%)",
                  },
                  height: {
                    type: "string",
                    desription:
                      "the height of the graph in the screen as percentage (e.g: height:10%)",
                  },
                },
              },
            },
          },
          required: [
            "table",
            "name",
            "mainSlicer",
            "subSlicers",
            "slicerType",
            "top",
            "left",
            "width",
            "height",
          ],
        },
      };

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an AI that outputs JSON only.Always format the 'top, left, width, height' property as a percentage (e.g., '10%'). Do not use pixels or any other units. for table u can use 1 table or multiple tables by adding a ',' between them and y-axis can take from multiple tables",
          },
          {
            role: "user",
            content: `Given the following schema, generate a valid JSON graph configuration:
          Schema: ${concatenatedText}
          Query: ${query}`,
          },
        ],
        functions: [graphSchema, slicerSchema],
        function_call: "auto",
        temperature: 0.2,
        top_p: 0.1,
      });

      const responsePayload = response.choices[0]?.message?.function_call
        ?.arguments
        ? JSON.parse(response.choices[0].message.function_call.arguments)
        : {};

      console.log("Graph Configuration: ", responsePayload);

      return res.status(200).json({
        message: queryResponse,
        graphConfig: responsePayload,
      });
    } catch (error) {
      console.error("Error occurred: ", error);
      return res.status(500).json({ message: error.message });
    }
  });
};

module.exports = { AIEndPoints };
