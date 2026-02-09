import { useForm, Controller } from "react-hook-form";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { createCollection } from "@/api/collections";

type CreateCollectionForm = {
  name: string;
  description: string;
};

export default function CreateCollectionPanel({
  onCreated,
  onCancel,
}: {
  onCreated: () => void;
  onCancel: () => void;
}) {
  const form = useForm<CreateCollectionForm>({
    defaultValues: { name: "", description: "" },
  });

  async function onSubmit(data: CreateCollectionForm) {
    await createCollection({
      name: data.name.trim(),
      description: data.description.trim() || undefined,
    });
    onCreated();
  }

  return (
    <motion.form
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-3 pb-4">
        <Controller
          name="name"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} placeholder="Name" autoFocus />
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field }) => <Input {...field} placeholder="Description" />}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Spinner /> : "Create"}
          </Button>

          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
