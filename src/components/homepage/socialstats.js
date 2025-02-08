import { Facebook, Twitter, Instagram } from 'lucide-react';

export function SocialStats() {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="font-semibold mb-4">Social Source</h3>
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <Facebook className="text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold">Facebook - 125 sales</h4>
              <p className="text-sm text-gray-500">
                Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus tincidunt.
              </p>
            </div>
          </div>
          <button className="text-blue-600 text-sm">Learn more →</button>
        </div>
        
        <div className="flex justify-between">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Facebook className="text-blue-600" />
            </div>
            <p className="font-semibold">Facebook</p>
            <p className="text-sm text-gray-500">125 sales</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Twitter className="text-blue-600" />
            </div>
            <p className="font-semibold">Twitter</p>
            <p className="text-sm text-gray-500">112 sales</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Instagram className="text-blue-600" />
            </div>
            <p className="font-semibold">Instagram</p>
            <p className="text-sm text-gray-500">104 sales</p>
          </div>
        </div>
      </div>
    </div>
  );
}