import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import NERFormModal from "../../components/FormModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Delete, FileUpload } from "@mui/icons-material";
import NERSuccessButton from "../../components/NERSuccessButton";
import { Project } from "shared";

export interface ProjectFormInput {
  title: string;
  description: string;
  githubUrl: string;
  images: {
    file: File;
  }[];
  skills: {
    name: string;
  }[];
}

const schema = yup.object<ProjectFormInput>().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required(),
  githubUrl: yup.string().required(),
  skills: yup
    .array()
    .required()
    .of(yup.object().shape({ name: yup.string().required() })),
  images: yup.array().required(),
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
  const onSubmit = async (data: ProjectFormInput) => {
    try {
      await mutateAsync(data);
      onHide();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
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
      formId="Create Project Form"
    >
      <Grid container spacing={2}>
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
        </Grid>
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
            <FormLabel title="Github Url" />
            <Controller
              control={control}
              name="githubUrl"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                    placeholder="Enter a Github Url"
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    error={!!errors.githubUrl}
                  />
                );
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={8}>
          <FormControl fullWidth>
            <FormLabel title="Skills" />
            <Grid container>
              {skills.map((skill, i) => {
                return (
                  <Grid
                    key={skill.id}
                    item
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      placeholder="Enter a skill"
                      {...register(`skills.${i}.name`)}
                    />
                    <IconButton onClick={() => removeSkills(i)}>
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
        <Grid item xs={12} lg={8}>
          <FormLabel title="Images" />
          <Grid container>
            {images.map((image, index) => {
              return (
                <Grid
                  key={image.id}
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <h4>{image.file.name}</h4>
                  <IconButton onClick={() => removeImage(index)}>
                    <Delete />
                  </IconButton>
                </Grid>
              );
            })}
            <Button
              variant="contained"
              color="success"
              startIcon={<FileUpload />}
              component="label"
            >
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
