export default function HomePage() {
  return (
    <main className="container mx-auto px-8 py-6">
      <div className="grid grid-cols-12 gap-6">
        <article className="col-span-8 bg-white">
          <img 
            src="https://picsum.photos/800/400" 
            alt="Featured article" 
            className="w-full h-[400px] object-cover"
          />
          <div className="p-4">
            <span className="text-red-600 font-bold">KIEMELT</span>
            <h2 className="text-3xl font-bold mt-2">
              Jelentős változások várhatók a magyar közlekedésben
            </h2>
            <p className="mt-2 text-gray-600">
              Az új közlekedési stratégia számos újítást hoz a főváros és a vidéki nagyvárosok életébe...
            </p>
          </div>
        </article>

        <div className="col-span-4 space-y-4">
          <article className="border-b pb-4">
            <span className="text-blue-600 font-bold">KÜLFÖLD</span>
            <h3 className="font-bold mt-1">
              Újabb diplomáciai feszültség alakult ki az EU és Oroszország között
            </h3>
          </article>
          {/* ... other articles ... */}
        </div>
      </div>
    </main>
  )
} 