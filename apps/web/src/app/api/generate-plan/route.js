export async function POST(request) {
  try {
    const { diet, householdSize, cookingTime, exclusions } =
      await request.json();

    const prompt = `
      You are Culinea, a master meal planner. Create a 7-day meal plan and grocery list.
      Constraints:
      - Diet: ${diet}
      - Household Size: ${householdSize} people
      - Cooking Time Level: ${cookingTime}
      - Exclusions: ${exclusions.join(", ")}

      Return ONLY a JSON object with this structure:
      {
        "meals": [
          { "day": "Monday", "name": "Meal Name", "description": "Brief description" },
          ... (7 days)
        ],
        "groceries": [
          { "id": "1", "category": "Produce", "name": "Item Name", "amount": "Quantity" },
          ...
        ]
      }
      The recipes should be realistic, healthy, and fit the constraints.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "system", content: prompt }],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      throw new Error("AI Generation failed");
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return Response.json(result);
  } catch (error) {
    console.error(error);
    // Fallback data for testing if API fails
    return Response.json({
      meals: [
        {
          day: "Monday",
          name: "Zucchini & Lemon Pasta",
          description: "Fresh and light pasta",
        },
        {
          day: "Tuesday",
          name: "Roasted Chicken & Veggies",
          description: "Hearty one-pan meal",
        },
        {
          day: "Wednesday",
          name: "Quinoa Buddha Bowl",
          description: "Protein-packed veggie bowl",
        },
        {
          day: "Thursday",
          name: "Grilled Salmon",
          description: "Quick and healthy fish dish",
        },
        {
          day: "Friday",
          name: "Tofu Stir-fry",
          description: "Fast veggie-forward fry",
        },
        {
          day: "Saturday",
          name: "Homemade Pizza",
          description: "Fun weekend dinner",
        },
        {
          day: "Sunday",
          name: "Slow-cooked Stew",
          description: "Comforting end to the week",
        },
      ],
      groceries: [
        { id: "1", category: "Produce", name: "Zucchini", amount: "2 large" },
        { id: "2", category: "Produce", name: "Lemons", amount: "2" },
        { id: "3", category: "Meat", name: "Chicken Breast", amount: "500g" },
        { id: "4", category: "Pantry", name: "Pasta", amount: "1 box" },
      ],
    });
  }
}
