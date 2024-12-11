import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAssets, createAsset, updateAsset } from '../api/assets';
import type { Asset } from '../types/asset';

export const useAssets = () => {
  const queryClient = useQueryClient();

  const assetsQuery = useQuery({
    queryKey: ['assets'],
    queryFn: getAssets,
  });

  const createAssetMutation = useMutation({
    mutationFn: createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });

  const updateAssetMutation = useMutation({
    mutationFn: ({ id, asset }: { id: string; asset: Partial<Asset> }) =>
      updateAsset(id, asset),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });

  return {
    assets: assetsQuery.data ?? [],
    isLoading: assetsQuery.isLoading,
    error: assetsQuery.error,
    createAsset: createAssetMutation.mutate,
    updateAsset: updateAssetMutation.mutate,
  };
};