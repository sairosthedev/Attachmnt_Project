import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, Clock, Wrench, CheckCircle } from 'lucide-react';
import { api } from '../api/client';

interface FailureAnalysis {
  failureProbability: number;
  estimatedTimeToFailure: number;
  recommendedActions: string[];
  criticalComponents: string[];
}

interface Props {
  assetId: string;
}

export const FailureAnalysis: React.FC<Props> = ({ assetId }) => {
  const { data: analysis, isLoading } = useQuery<FailureAnalysis>({
    queryKey: ['failure-analysis', assetId],
    queryFn: async () => {
      const response = await api.get(`/ml/analyze/${assetId}`);
      return response.data;
    },
  });

  if (isLoading || !analysis) {
    return <div>Loading analysis...</div>;
  }

  const getRiskColor = (probability: number) => {
    if (probability < 0.3) return 'text-green-500';
    if (probability < 0.7) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Failure Analysis</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className={getRiskColor(analysis.failureProbability)} />
            <h3 className="font-medium">Failure Risk</h3>
          </div>
          <p className="text-2xl font-bold">
            {(analysis.failureProbability * 100).toFixed(1)}%
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="text-blue-500" />
            <h3 className="font-medium">Time to Failure</h3>
          </div>
          <p className="text-2xl font-bold">
            {analysis.estimatedTimeToFailure.toFixed(1)} days
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Wrench className="text-orange-500" />
            <h3 className="font-medium">Critical Components</h3>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {analysis.criticalComponents.map((component, index) => (
              <li key={index} className="text-gray-600">{component}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="text-green-500" />
            <h3 className="font-medium">Recommended Actions</h3>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {analysis.recommendedActions.map((action, index) => (
              <li key={index} className="text-gray-600">{action}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};