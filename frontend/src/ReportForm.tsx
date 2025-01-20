import axios from 'axios';
import * as React from 'react';
import { TextField, Checkbox, Button, Typography, Paper, Box, FormControlLabel, Input } from "@mui/material";

// Item Object - hold a configure report item.
interface Item {
    name: string;
    required: boolean
    type: string;
  }
  // Props Object - An Object that hold the props for Form componnets.
interface FormProps {
    items: Item[];
    heading: string;
  }
  // Form functional component
  export const ReportForm: React.FC<FormProps> = ({ items ,heading }:FormProps) => {

    const [form, setForm] = React.useState<Record<string, any>>({});
    const [errors, setErrors] = React.useState<{startDate? :string; endDate?:String}>({})
    const validateDate = () =>
    {
        const startDate = new Date(form["startDate"]);
        const endDate = new Date(form["endDate"]);
        const newErrors : {startDate ? : string; endDate?: string} = {}

        if(form["startDate"] && form["endDate"] && startDate > endDate){
            newErrors.startDate = "Start Date must be before End Date";
            newErrors.endDate = "End Date nust be after Start Date";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // return true if there is no errors.
    }


    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        const convertedForm  : Record<string,any> = convertForm(form);   // making the data as the real type for DB representation 
        event.preventDefault();
        if(validateDate())
        {
            console.log("Form submitted");
            console.log(convertedForm)
            axios
            .post('http://127.0.0.1:5000/user_response', convertedForm, {
                headers: {
                'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('Server Response:', response.data);
                alert('Form data submitted successfully!');
              })
              .catch((error) => {
                console.error('Error submitting form:', error);
                alert('Error submitting form. Please try again.');
              });
            
        }

    }

    const convertForm =(form: Record<string, any>): Record<string, any> =>
    {
          const convertedForm  : Record<string,any> = {};
          items.forEach((item)=>{
          const value = form[item.name];
          switch(item.type)
          {
              case 'int':
                  convertedForm[item.name] = parseInt(value, 10) || null;
                  break;
              case 'float':
                  convertedForm[item.name] =  parseFloat(value) || null;
                  break;
      
              case 'bool':
                  convertedForm[item.name] = Boolean(value);
                  break;
              case 'date':
                  convertedForm[item.name] = value ? new Date(value).toISOString() : null; // Convert to ISO date string
                  break;
              default:
                  convertedForm[item.name] = value; // Default: keep as string
          }
      
      
        });
        console.log(convertForm)
        return convertedForm;

    }
    /**
 * Changes camel case to a human readable format. So helloWorld bacome "Hello World". 
 * */
    const camelCaseToReadable = (input: string)  => {
        // Add a space before each uppercase letter and ensure proper capitalization
        return input
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space between lowercase and uppercase letters
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle consecutive uppercase letters properly
            .replace(/_/g, ' ') // Optionally replace underscores with spaces
            .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter of the result
    }

    const handleInputChange = (name: string, value: any) => {
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

    

    const convertToInputTpye =(type: string)=> {
        switch(type){
            case 'int':
                return 'number'
            case 'float':
                return 'number'
            case 'bool':
                return 'checkbox'
            default:
                return type
        }
    }

    return (
        <Box       
            sx={{
            display: "flex", // Flexbox for centering
            justifyContent: "center", // Horizontally center
            alignItems: "center", // Vertically center
            minHeight: "100vh", // Full screen height
            minWidth: "100vw",
            padding: 2, // Padding on smaller screens
            backgroundColor: "#f5f5f5", // Light background
          }}>
            <Paper 
                elevation={3}
                sx={{
                width: "100%", // Take full width
                maxWidth: "600px", // Limit max width
                // maxHeight: "1300px",
                padding: 4, // Padding inside the form
                backgroundColor: "white",
                }}>
                <Typography variant="h4"  gutterBottom>{heading}</Typography>
                        <form onSubmit={onSubmitHandler}>
                            {items.map((item, idx)=>(
                                <Box key={item.name}  mb={2}> 
                                    {item.type === "bool" ? (
                                        <FormControlLabel
                                        control={
                                            <Checkbox
                                            checked={!!form[item.name]} // the !! inshure that the value of check is always nither true or false.
                                            onChange={(e) => handleInputChange(item.name, e.target.checked)}
                                            />
                                        }
                                        label={camelCaseToReadable(item.name)}
                                        />
                                    ) : (
                                        <TextField
                                        fullWidth
                                        label={camelCaseToReadable(item.name)}
                                        type={convertToInputTpye(item.type)}
                                        value={form[item.name] || ""}
                                        required={item.required}
                                        
                                        error={
                                            item.name === 'startDate' ? Boolean(errors.startDate):
                                             item.name ==='endDate' ?  Boolean(errors.endDate): false
                                        }
                                        helperText={
                                            item.name === 'startDate' ? errors.startDate : 
                                            item.name === 'endDate' ? errors.endDate : ""
                                        }

                                        slotProps={{

                                            htmlInput: {
                                                step: item.type === "int" ? "1" : "any", // '1' for integers, 'any' for floats
                                                min: 0, // Optional: Specify a minimum value
                                            },
                                            inputLabel: { shrink: item.type === "date" || Boolean(form[item.name]),
                                             }, // Use shrink only for date or if there's a value

                                          }}
                                        onChange={(e) => handleInputChange(item.name, e.target.value)}
                                        variant="outlined"
                                        />
                                    )}

                                </Box>
                            ))}
                            <Button             
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                sx={{ marginTop: 2 }} >
                                    Save
                            </Button>
                        </form>
            </Paper>
        </Box>
    );
  };

