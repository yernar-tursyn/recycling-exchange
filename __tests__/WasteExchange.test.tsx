import { render, screen, fireEvent, waitFor, within } from "@testing-library/react"
import "@testing-library/jest-dom"
import WasteExchange from "../components/WasteExchange"
import type { fetchWasteItems } from "../services/api"
import { describe, it, expect, jest, beforeEach } from "@jest/globals"
import type { WasteItem } from "../types/types"
import { waitForElementToBeRemoved } from "@testing-library/react"

const mockFetchWasteItems = jest.fn() as jest.MockedFunction<typeof fetchWasteItems>

jest.mock("../services/api", () => ({
    fetchWasteItems: mockFetchWasteItems,
}))

describe("WasteExchange component", () => {
    const mockWasteItems: WasteItem[] = [
        {
            id: 1,
            name: "Бумага",
            type: "paper",
            volume: 100,
            arrivalTime: "2023-05-20T10:00:00Z",
            description: "Макулатура различных сортов",
            pricePerKg: 5,
            availableQuantity: 100,
        },
        {
            id: 2,
            name: "Пластик",
            type: "plastic",
            volume: 50,
            arrivalTime: "2023-05-20T11:00:00Z",
            description: "ПЭТ бутылки и пластиковые контейнеры",
            pricePerKg: 10,
            availableQuantity: 50,
        },
    ]

    beforeEach(() => {
        jest.clearAllMocks();
        mockFetchWasteItems.mockImplementation(async () => {
            console.log("Fetching waste items...");
            return mockWasteItems;
        });
    });

    it("рендерит отходы", async () => {
        render(<WasteExchange />);

        console.log("Проверка состояния загрузки..."); 
        expect(screen.getByText("Загрузка...")).toBeInTheDocument();

        console.log("Ожидание появления карточек..."); 
        const cards = await screen.findAllByTestId("waste-card");
        expect(cards.length).toBeGreaterThan(0);

        console.log("Проверка наличия 'Бумага' и 'Пластик'..."); 
        const paperCard = cards.find((card) => within(card).queryByText("Бумага"));
        const plasticCard = cards.find((card) => within(card).queryByText("Пластик"));

        expect(paperCard).toBeInTheDocument();
        expect(plasticCard).toBeInTheDocument();
    });

    it("открывает и закрывает модальное окно", async () => {
        render(<WasteExchange />);

        await waitForElementToBeRemoved(() => screen.queryByText("Загрузка..."), {
            timeout: 5000,
        });

        const cards = await screen.findAllByTestId("waste-card");

        const paperCard = cards.find((card) => within(card).queryByText("Бумага"));
        expect(paperCard).toBeInTheDocument();

        const detailsButton = within(paperCard!).getByTestId("details-button");
        fireEvent.click(detailsButton);

        const closeButton = await screen.findByText("Закрыть");
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText("Закрыть")).not.toBeInTheDocument();
        });
    });

    it("фильтрует отходы по типу", async () => {
        render(<WasteExchange />);

        await waitForElementToBeRemoved(() => screen.queryByText("Загрузка..."), {
            timeout: 5000,
        });

        const filterSelect = screen.getByRole("combobox", { name: "Фильтр по типу" });
        fireEvent.change(filterSelect, { target: { value: "plastic" } });

        await waitFor(() => {
            expect(
                screen.queryByText("Бумага", { selector: '[data-testid="waste-card"]' })
            ).not.toBeInTheDocument(); 

            const filteredCards = screen.getAllByTestId("waste-card");
            expect(filteredCards).toHaveLength(1);

            expect(within(filteredCards[0]).getByText("Пластик")).toBeInTheDocument();

            const plasticCard = screen.getByText("Пластик", { selector: '[data-testid="waste-name"]' });

            expect(plasticCard).toBeInTheDocument();
        });
    });
})
