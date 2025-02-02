import Home from "@/app/page"
import { render, screen } from "@testing-library/react"

jest.mock("../components/Header", () => {
  return function DummyHeader() {
    return <div data-testid="mock-header">Mock Header</div>
  }
})

jest.mock("../components/WasteExchange", () => {
  return function DummyWasteExchange() {
    return <div data-testid="mock-waste-exchange">Mock Waste Exchange</div>
  }
})

describe("Home", () => {
  it("renders the header and waste exchange components", () => {
    render(<Home />)

    screen.debug()

    const header = screen.getByTestId("mock-header")
    const wasteExchange = screen.getByTestId("mock-waste-exchange")

    expect(header).toBeInTheDocument()
    expect(wasteExchange).toBeInTheDocument()
  })

  it("has the correct background color", () => {
    render(<Home />)

    const outerDiv = screen.getByTestId("home-container")
    expect(outerDiv).toHaveClass("bg-gray-100")
  })

  it("has a container with correct padding", () => {
    render(<Home />)

    const mainElement = screen.getByRole("main")
    expect(mainElement).toHaveClass("container mx-auto p-4")
  })
})
