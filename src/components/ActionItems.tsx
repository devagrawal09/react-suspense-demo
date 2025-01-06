import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

type ActionItem = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

type ActionItemsProps = {
  items: ActionItem[];
};

export function ActionItems({ items: initialItems }: ActionItemsProps) {
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Action Items</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={item.completed}
                onCheckedChange={() => toggleItem(item.id)}
              />
              <label
                htmlFor={item.id}
                className={`flex-grow ${
                  item.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {item.title}
              </label>
              <span className="text-sm text-muted-foreground">
                Due: {item.dueDate}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
