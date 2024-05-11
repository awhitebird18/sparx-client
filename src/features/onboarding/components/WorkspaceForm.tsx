import React from 'react';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import { observer } from 'mobx-react-lite';
import { useWorkspaceForm } from '../hooks/useWorkspaceForm';

const WorkspaceForm: React.FC = observer(() => {
  const { isLoading } = useOnboardingStore();
  const { form, handleFormSubmit } = useWorkspaceForm();

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="w-full flex flex-col space-y-6 max-w-sm">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter a workspace name" {...field} className="h-11 bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={`font-medium gap-2 ${isLoading ? 'opacity-50' : ''}`}
          type="submit"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? 'Saving roadmap...' : 'Create roadmap'}
        </Button>
      </form>
    </Form>
  );
});

export default WorkspaceForm;
