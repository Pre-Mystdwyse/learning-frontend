import { useHeroActions, useProfileFormData } from '@/entities/hero';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormValues } from './schema';

export const useProfileForm = () => {
  const { name, age, mood, element, extra, info } = useProfileFormData();
  const { updateProfile } = useHeroActions();

const {
  register,
  handleSubmit,
  control,
  formState: { errors },
} = useForm<ProfileFormValues>({
  resolver: zodResolver(profileSchema),
  mode: 'onTouched',
  defaultValues: {
    name: name || '',
    age: age || 20,
    mood: mood || 'good-neutral',
    element: element || 'fire',
    extra: extra || [],
    info: info || '',
  }
});

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile(data);
  }

  return {
    register,
    errors,
    control,
    onSubmit: handleSubmit(onSubmit),
  };
};
