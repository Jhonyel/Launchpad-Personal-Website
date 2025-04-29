import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Experience } from "shared";
import * as yup from "yup";
import LoadingIndicator from "../../components/LoadingIndicator";
import NERFormModal from "../../components/FormModal";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Delete, FileUpload } from "@mui/icons-material";

export interface ExperienceFormInput {
  title: string;
  description: string;
  companyName: string;
  location: string;
  images: {
    file: File;
  }[];
}

const schema = yup.object<ExperienceFormInput>().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("description is required"),
  companyName: yup.string().required("Company name is required"),
  location: yup.string().required("Location is required"),
  images: yup.array().required(),
});

const ExperienceForm = ({
  open,
  onHide,
  mutateAsync,
  defaultValues,
  isLoading,
}: {
  open: boolean;
  onHide: () => void;
  mutateAsync: (data: ExperienceFormInput) => Promise<Experience>;
  defaultValues: ExperienceFormInput;
  isLoading: boolean;
}) => {
  const onSubmit = async (data: ExperienceFormInput) => {
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
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
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
      title={"Create Experience"}
      onHide={onHide}
      onFormSubmit={onSubmit}
      formId="Create Experience Form"
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
            <FormLabel title="Company Name" />
            <Controller
              control={control}
              name="companyName"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                    placeholder="Enter a Company Name"
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    error={!!errors.companyName}
                  />
                );
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={8}>
          <FormControl fullWidth>
            <FormLabel title="Location" />
            <Controller
              control={control}
              name="location"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                    placeholder="Enter a Location"
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    error={!!errors.location}
                  />
                );
              }}
            />
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

export default ExperienceForm;
