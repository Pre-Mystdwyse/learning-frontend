import { useHeroStore } from '@/entities/hero';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

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

  const [formData, setFormData] = useState({
    name: name || '',
    age: age || 20,
    mood: mood || 'good-neutral',
    element: element || 'fire',
    extra: extra || [],
    info: info || '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;

    setFormData((prev) => {
      switch (type) {
        case 'checkbox': {
          const isChecked = (event.target as HTMLInputElement).checked;
          return {
            ...prev,
            [name]: isChecked
              ? [...(prev[name as keyof typeof prev] as string[]), value]
              : (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
          };
        }
        default: {
          return {
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
          };
        }
      }
    });
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    updateProfile(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
