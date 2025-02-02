"use client"

import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import WasteCard from "./WasteCard";
import Modal from "./Modal";
import { fetchWasteItems } from "../services/api";
import type { WasteItem } from "../types/types";

const WasteExchange: React.FC = () => {
    const [filter, setFilter] = useState("");
    const [selectedItem, setSelectedItem] = useState<WasteItem | null>(null);
    const [wasteItems, setWasteItems] = useState<WasteItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            try {
                const items = await fetchWasteItems();
                if (mounted) {
                    setWasteItems(items);
                    setIsLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    setError(err as Error);
                    setIsLoading(false);
                }
            }
        };

        loadData();

        return () => {
            mounted = false;
        };
    }, []);

    const filteredItems = wasteItems.filter((item) => (filter ? item.type === filter : true));

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Произошла ошибка</div>;

    return (
        <>
            <Filter onFilterChange={setFilter} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                    <WasteCard key={item.id} item={item} onDetailsClick={setSelectedItem} />
                ))}
            </div>
            <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
        </>
    );
};

export default WasteExchange;