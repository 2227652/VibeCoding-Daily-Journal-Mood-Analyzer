import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Lightbulb, Sparkles } from 'lucide-react';
import { entrySchema, type EntryFormData } from '../../lib/schemas';
import { analyzeTextMood, countWords } from '../../lib/utils';
import { WRITING_PROMPTS, MOOD_MAP } from '../../lib/constants';
import type { JournalEntry } from '../../types/journal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { MoodPicker } from './MoodPicker';
import { TagSelector } from './TagSelector';

interface EntryFormProps {
  entry: JournalEntry | null;
  onSave: (data: EntryFormData) => void;
  onClose: () => void;
}

export function EntryForm({ entry, onSave, onClose }: EntryFormProps) {
  const [prompt, setPrompt] = useState('');
  const [detectedMood, setDetectedMood] = useState('');

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<EntryFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(entrySchema) as any,
    defaultValues: {
      title: entry?.title ?? '',
      content: entry?.content ?? '',
      mood: entry?.mood,
      tags: entry?.tags ?? ([] as string[]),
    },
  });

  const content = watch('content');
  const wordCount = countWords(content || '');

  useEffect(() => {
    if (content && content.length > 20) {
      const mood = analyzeTextMood(content);
      const cfg = MOOD_MAP[mood];
      setDetectedMood(`${cfg.emoji} Auto-detected: ${cfg.label}`);
    } else {
      setDetectedMood('');
    }
  }, [content]);

  function getPrompt() {
    const p = WRITING_PROMPTS[Math.floor(Math.random() * WRITING_PROMPTS.length)];
    setPrompt(p);
  }

  function usePrompt() {
    if (prompt) {
      const cur = content || '';
      setValue('content', cur ? `${cur}\n\n${prompt}` : prompt);
      setPrompt('');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-2xl bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700 shrink-0">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
            {entry ? 'Edit Entry' : 'New Entry'}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={getPrompt}
              title="Get a writing prompt"
              className="p-2 rounded-lg text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 cursor-pointer"
            >
              <Lightbulb className="w-5 h-5" />
            </button>
            <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer">
              <X className="w-5 h-5 text-gray-500 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* Writing prompt banner */}
        {prompt && (
          <div className="mx-6 mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start justify-between gap-3 shrink-0">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800 dark:text-amber-300">{prompt}</p>
            </div>
            <button type="button" onClick={usePrompt} className="text-xs text-amber-600 dark:text-amber-400 font-medium hover:underline whitespace-nowrap cursor-pointer">
              Use it
            </button>
          </div>
        )}

        {/* Form body */}
        <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4 overflow-y-auto px-6 py-4">
          <Input
            {...register('title')}
            id="title"
            label="Title"
            placeholder="What's on your mind today?"
            error={errors.title?.message}
          />

          <Controller
            name="mood"
            control={control}
            render={({ field }) => (
              <MoodPicker
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.mood?.message}
              />
            )}
          />

          <div className="flex flex-col gap-1">
            <Textarea
              {...register('content')}
              id="content"
              label="Journal Entry"
              placeholder="Write freely…"
              rows={7}
              error={errors.content?.message}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 dark:text-slate-500">{wordCount} words</span>
              {detectedMood && (
                <span className="text-xs text-violet-600 dark:text-violet-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {detectedMood}
                </span>
              )}
            </div>
          </div>

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TagSelector value={field.value} onChange={field.onChange} />
            )}
          />

          <div className="flex gap-3 pt-2 pb-1">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {entry ? 'Save Changes' : 'Save Entry'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
