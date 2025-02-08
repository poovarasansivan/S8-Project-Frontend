export function TopCities() {
    const cities = [
      { name: 'San Francisco', value: 1456 },
      { name: 'Los Angeles', value: 1123 },
      { name: 'San Diego', value: 1026 }
    ];
  
    return (
      <div className="bg-white rounded-lg p-6">
        <h3 className="font-semibold mb-4">Top Cities Selling Product</h3>
        <div className="space-y-4">
          {cities.map((city, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{city.name}</span>
              <span className="font-semibold">{city.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }