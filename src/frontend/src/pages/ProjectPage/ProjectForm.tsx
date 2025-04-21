import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import NERFormModal from "../../components/FormModal";
import { useCreateProject } from "../../hooks/projects.hooks";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import NERSuccessButton from "../../components/NERSuccessButton";

export interface ProjectFormInput {
  title: string;
  description: string;
  images: {
    file: File;
  }[];
  skills: {
    name: string;
  }[];
  githubUrl: string;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  skills: yup
    .array()
    .of(yup.object().shape({ name: yup.string().required() }))
    .required(),
});

const ProjectForm = ({
  open,
  onHide,
}: {
  open: boolean;
  onHide: () => void;
}) => {
  const { mutateAsync, isLoading } = useCreateProject();
  const defaultValues = {
    title: "",
    description: "",
    skills: [],
    images: [],
  };

  const onSubmit = async (data: ProjectFormInput) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    append: appendSkills,
    remove: removeSkills,
    fields: skills,
  } = useFieldArray({
    control,
    name: "skills",
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NERFormModal
      handleUseFormSubmit={handleSubmit}
      reset={reset}
      open={open}
      title={"Create Project"}
      onHide={onHide}
      onFormSubmit={onSubmit}
    >
      <Grid item xs={12} lg={8}>
        <FormControl fullWidth>
          <FormLabel title="Title" />
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange } }) => {
              return (
                <TextField
                  placeholder="Enter a Title"
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  error={!!errors.title}
                />
              );
            }}
          />
        </FormControl>
        <Grid item xs={12} lg={8}>
          <FormControl fullWidth>
            <FormLabel title="Description" />
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                    placeholder="Enter a Description"
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    error={!!errors.description}
                  />
                );
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={8}>
          <FormControl fullWidth>
            <FormLabel title="SKills" />
            <Grid container>
              {skills.map((skill, i) => {
                return (
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      placeholder="Enter a skill"
                      value={skill.name}
                      {...register(`skills.${i}`)}
                    />
                    <IconButton onClick={() => removeSkills(i)}>
                      {" "}
                      <Delete />
                    </IconButton>
                  </Grid>
                );
              })}
              <NERSuccessButton
                title="Add Skill"
                onClick={() => {
                  appendSkills({ name: "" });
                }}
              >
                Add Skill
              </NERSuccessButton>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </NERFormModal>
  );
};

export default ProjectForm;
