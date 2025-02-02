import Header from "../components/Header"
import WasteExchange from "../components/WasteExchange"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100" data-testid="home-container">
      <Header />
      <main className="container mx-auto p-4">
        <WasteExchange />
      </main>
    </div>
  )
}

