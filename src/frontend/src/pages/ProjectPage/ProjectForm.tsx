import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import NERFormModal from "../../components/FormModal";
import { useCreateProject } from "../../hooks/projects.hooks";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import NERSuccessButton from "../../components/NERSuccessButton";
import { Project } from "shared";

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
  githubUrl: yup.string().required(),
});

const ProjectForm = ({
  open,
  onHide,
  mutateAsync,
  defaultValues,
  isLoading,
}: {
  open: boolean;
  onHide: () => void;
  mutateAsync: (data: ProjectFormInput) => Promise<Project>;
  defaultValues: ProjectFormInput;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  const onSubmit = async (data: ProjectFormInput) => {
    try {
      await mutateAsync(data);
      onHide();
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

  const {
    append: appendImage,
    remove: removeImage,
    fields: images,
  } = useFieldArray({
    control,
    name: "images",
  });

  return (
    <NERFormModal
      handleUseFormSubmit={handleSubmit}
      reset={reset}
      open={open}
      title={"Create Project"}
      onHide={() => {}}
      onFormSubmit={onSubmit}
    >
      <Grid container>
        <Grid item>
          <FormControl fullWidth>
            <FormLabel title="Title" />
            <Controller
              control={control}
              name="title"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                    placeholder="Enter a title"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    error={!!errors.title}
                  />
                );
              }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <FormLabel title="Description" />
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                    placeholder="Enter a description"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    error={!!errors.title}
                  />
                );
              }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <FormLabel title="Github URL" />
            <Controller
              control={control}
              name="githubUrl"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                    placeholder="Enter a Github URL"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    error={!!errors.title}
                  />
                );
              }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <FormLabel title="Skills" />
            <Grid container>
              {skills.map((skill, i) => {
                return (
                  <Grid item>
                    <TextField
                      placeholder="Enter a skill"
                      value={skill.name}
                      {...register(`skills.${i}`)}
                    />
                    <IconButton onClick={() => removeSkills(i)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                );
              })}
              <NERSuccessButton
                title="Add Skill"
                onClick={() => appendSkills({ name: "" })}
              />
            </Grid>
          </FormControl>
        </Grid>
        <Grid item>
          <FormLabel title="Images" />
          <Grid container>
            {images.map((image, index) => {
              return (
                <Grid item>
                  <h4>{image.name}</h4>
                  <IconButton onClick={() => removeImage(index)}>
                    <Delete />
                  </IconButton>
                </Grid>
              );
            })}
            <Button>
              Upload
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={(e) => {
                  if (e.target.files) {
                    [...e.target.files].forEach((file) => {
                      appendImage({ file });
                    });
                  }
                }}
              />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </NERFormModal>
  );
};

export default ProjectForm;
