import { useHeroStore } from '@/entities/hero';
import { useShallow } from 'zustand/shallow';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormValues } from './schema';

export const useProfileForm = () => {
  const { name, age, mood, element, extra, info, updateProfile } = useHeroStore(
    useShallow((state) => ({
      name: state.name,
      age: state.age,
      mood: state.mood,
      element: state.element,
      extra: state.extra,
      info: state.info,
      updateProfile: state.updateProfile,
    })),
  );

const {
  register,
  handleSubmit,
  control,
  trigger,
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
    trigger,
    errors,
    control,
    onSubmit: handleSubmit(onSubmit),
  };
};
