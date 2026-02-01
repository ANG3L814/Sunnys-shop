
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search } from "lucide-react";

const flowersData = [
  { id: 1, name: "Red Roses", country: "Netherlands", price: 2900 },
  { id: 2, name: "Cherry Blossoms", country: "Japan", price: 4500 },
  { id: 3, name: "Sunflowers", country: "USA", price: 2500 },
  { id: 4, name: "Tulips", country: "France", price: 3500 },
  { id: 5, name: "Orchids", country: "Thailand", price: 4000 },
];

export default function SunnysShop() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);

  const filteredFlowers = flowersData.filter(flower =>
    flower.name.toLowerCase().includes(query.toLowerCase()) ||
    flower.country.toLowerCase().includes(query.toLowerCase())
  );

  const addToCart = (flower) => setCart([...cart, flower]);

  const checkout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🌻 Sunny’s Shop</h1>
        <div className="flex items-center gap-2">
          <ShoppingCart />
          <span>{cart.length}</span>
        </div>
      </header>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search flowers or country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button><Search /></Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredFlowers.map(flower => (
          <Card key={flower.id} className="rounded-2xl shadow">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{flower.name}</h2>
              <p className="text-sm text-gray-600">From {flower.country}</p>
              <p className="mt-2 font-bold">${(flower.price / 100).toFixed(2)}</p>
              <Button className="mt-4 w-full" onClick={() => addToCart(flower)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-2xl shadow-xl">
          <p className="font-semibold mb-2">Ready to checkout?</p>
          <Button onClick={checkout} className="w-full">Pay Securely</Button>
        </div>
      )}

      <footer className="mt-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Sunny’s Shop. All rights reserved.
      </footer>
    </div>
  );
}
