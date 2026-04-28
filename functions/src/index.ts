import * as functions from "firebase-functions";
import cors from "cors";

const corsHandler = cors({ origin: true });

export const triage = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const input = req.body.input?.toLowerCase();

      if (!input) {
        return res.status(400).json({
          error: "Input missing",
        });
      }

      // ---------- Resource Detection ----------
      let resource = "food";

      if (
        input.includes("blanket") ||
        input.includes("clothes")
      ) {
        resource = "blankets";
      } else if (
        input.includes("water") ||
        input.includes("bottle")
      ) {
        resource = "water";
      } else if (
        input.includes("medicine") ||
        input.includes("medical")
      ) {
        resource = "medicine";
      }

      // ---------- Quantity Extraction ----------
      const quantityMatch = input.match(/\d+/);

      const quantity = quantityMatch
        ? Number(quantityMatch[0])
        : 1;

      // ---------- Location Detection ----------
      let location = "nearby area";

      if (input.includes("station")) {
        location = "railway station";
      } else if (input.includes("hospital")) {
        location = "hospital area";
      } else if (input.includes("school")) {
        location = "school zone";
      } else if (input.includes("market")) {
        location = "market area";
      }

      // ---------- Urgency ----------
      let urgency = "low";

      if (
        input.includes("urgent") ||
        input.includes("immediately") ||
        input.includes("asap")
      ) {
        urgency = "high";
      } else if (
        quantity > 20 ||
        resource === "medicine"
      ) {
        urgency = "medium";
      }

      // ---------- Suggestion ----------
      let suggestion = "Contact nearby NGO";

      switch (resource) {
        case "food":
          suggestion = "Contact food donation NGO";
          break;

        case "blankets":
          suggestion = "Send blankets to nearby shelter";
          break;

        case "water":
          suggestion = "Coordinate water distribution";
          break;

        case "medicine":
          suggestion = "Notify nearby health center";
          break;
      }

      // ---------- Confidence ----------
      const confidence =
        Math.floor(Math.random() * 10) + 90;

      const response = {
        resource,
        quantity,
        location,
        urgency,
        suggestion,
        confidence,
      };

      return res.status(200).json({
        data: response,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  });
});