import ProductViewer from '@/components/ProductViewer/ProductViewer'

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Featured Product</h1>
      <ProductViewer modelUrl="/models/saintAnimated.gltf" />
    </main>
  )
}
