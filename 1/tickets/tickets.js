const tickets = [
  { from: "Moscow", to: "SPb" },
  { from: "Saransk", to: "Vladivostok" },
  { from: "NY", to: "London" },
  { from: "London", to: "Moscow" },
  { from: "SPb", to: "Saransk" },
];

function createRoute(tickets) {
  const result = [];

  const toPoints = tickets.map((t) => t.to);
  let startPoint = tickets.find((t) => !toPoints.includes(t.from));
  result.push(startPoint);

  while (true) {
    const nextPoint = tickets.find((t) => t.from === startPoint.to);
    if (nextPoint) {
      result.push(nextPoint);
      startPoint = nextPoint;
    } else {
      return result;
    }
  }
}

createRoute(tickets);

// Видел решение через Map и Set
function createRoutewithMapAndSet(tickets) {
  const fromMap = new Map();
  const toSet = new Set();

  for (let ticket of tickets) {
    toSet.add(ticket.to);
    fromMap.set(ticket.from, ticket);
  }

  let startPoint = tickets.find((t) => !toSet.has(t.from));
  const result = [];

  while (startPoint) {
    result.push(startPoint);
    startPoint = fromMap.get(startPoint.to);
  }

  return result;
}

createRoutewithMapAndSet(tickets);
