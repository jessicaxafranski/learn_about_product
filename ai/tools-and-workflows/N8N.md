# N8N - WORKFLOW

---

## 1. Executive Summary & Objective
To maintain high operational efficiency and eliminate stockouts, the business requires a robust, 24/7 automated inventory monitoring system. This project leverages **n8n** to integrate internal tracking systems (e.g., spreadsheets/databases) with automated communication channels.

Additionally, the infrastructure will support future **AI Agent** implementations capable of handling unstructured data, understanding context, and making dynamic decisions in unpredictable procurement scenarios.

---

## 2. Infrastructure & Deployment Strategy
To minimize operational costs while ensuring 100% workflow uptime, the deployment strategy will bypass high-cost SaaS licensing in favor of a self-hosted infrastructure.

* **Current State (MVT/Testing):** Local deployment utilizing **Docker** to facilitate rapid prototyping, workflow testing, and initial configurations at zero cost.
* **Production State:** Deployment on a dedicated **Virtual Private Server (VPS)** (estimated cost: 30 to 90 BRL/month). This guarantees the automation engine runs continuously without relying on local hardware.
* **Technical Resources:** The engineering team can access the source code and deployment blueprints via the official [n8n GitHub Repository](https://github.com/n8n-io/n8n). For specific self-hosted Docker compose setups, refer to the [n8n Docker Deployment Guide on GitHub](https://github.com/n8n-io/n8n/tree/master/docker).
* **Disaster Recovery:** All finalized workflows must be exported, version-controlled, and downloaded as JSON backups to ensure zero-loss migration if server maintenance is required.

---

## 3. Workflow Specifications

### Core Automation Flow: Critical Stock Alerts
The initial workflow is a deterministic, time-triggered automation designed to streamline the procurement loop.

#### Detailed Step-by-Step Execution:
1.  **Trigger:** Time-based scheduler set to execute daily at **08:00 AM**.
2.  **Data Ingestion:** Connect to the primary data source (e.g., Inventory Spreadsheet/ERP) to extract current stock levels.
3.  **Data Processing & Logic:** * Parse the inventory data.
    * Apply a filter condition: `Current Stock` < `Critical Stock Threshold`.
    * **Financial Guardrail:** Isolate and flag any critical anomalies or divergent data points for immediate user review to prevent financial discrepancies.
4.  **Output / Action:** Automatically generate and send a high-priority email notification to the Sales/Procurement team detailing exactly which products require urgent supplier orders.
   
## Workflow N8N

![Stock - Workflow](ai/images/stock_worflow.png)

---

## 4. Future State Roadmap: AI Agents Expansion
While phase one handles predictable, rule-based automation, phase two will introduce **n8n AI Agents** to manage complex, non-deterministic scenarios.

* **Contextual Interpretation:** Utilizing Large Language Models (LLMs) within n8n to interpret incoming supplier emails, chat messages, or unpredictable user inputs.
* **Autonomous Decision Making:** Empowering the system to decide the next best action based on historical context, rather than strict pre-defined rules.
* **Dynamic Execution:** Transforming the workflow from a static script into a responsive system capable of resolving edge cases (e.g., negotiating shipping delays or suggesting alternative suppliers).
## Workflow N8N

![Stock - Workflow](ai/images/ai_stock_agent.png)


---

## 5. System Integrations
The n8n ecosystem will be utilized to connect natively with market-leading tools, ensuring seamless data flow across:
* **Data Sources:** Google Sheets, Airtable, PostgreSQL, or company ERP APIs.
* **Communication Channels:** Gmail/Outlook, Slack, and WhatsApp Business API.
* **AI Ecosystem:** OpenAI (GPT models), LangChain components, and vector databases.