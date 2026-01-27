'use client';

import { FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ZoningInfo as ZoningInfoType } from '@/types';

interface ZoningInfoProps {
  zoningInfo: ZoningInfoType;
}

export default function ZoningInfo({ zoningInfo }: ZoningInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold">Zoning & Legal Information</h2>
      </div>

      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-lg text-blue-900 mb-1">{zoningInfo.type}</h3>
          <p className="text-sm text-blue-700">Classification Type</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Max Height</p>
            <p className="text-lg font-semibold">{zoningInfo.maxHeight}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Setback Requirements</p>
            <p className="text-sm font-semibold">{zoningInfo.setbackRequirements}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="text-green-600" size={20} />
          <h3 className="font-semibold">Allowed Uses</h3>
        </div>
        <ul className="space-y-2">
          {zoningInfo.allowedUses.map((use, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>{use}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="text-orange-600" size={20} />
          <h3 className="font-semibold">Restrictions</h3>
        </div>
        <ul className="space-y-2">
          {zoningInfo.restrictions.map((restriction, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-orange-600 mt-0.5">!</span>
              <span>{restriction}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          <strong>Disclaimer:</strong> This information is for general guidance only. Please consult with local
          planning and zoning departments for current regulations and requirements. Zoning laws may change,
          and additional permits or variances may be required for specific projects.
        </p>
      </div>
    </div>
  );
}
