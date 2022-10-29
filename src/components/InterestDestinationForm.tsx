import { Autocomplete, Button, Checkbox, Grid, TextField } from "@mui/material";
import { ApiResponse, ApiResponseCity, User } from "../interfaces/user";
import { FormWrapper } from "./FormWrapper";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCountry } from "../helpers/country";
import { getAllCity } from "../helpers/city";

interface InterestDestinationProps {
  country: ApiResponse[];
  city: ApiResponseCity[];
  updatedFields(fields: Partial<User>): void;
}

export const InterestDestinationForm = ({
  city,
  country,
  updatedFields,
}: InterestDestinationProps) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { data: countryApi, isLoading: countryLoading } = useQuery(
    ["country"],
    getAllCountry
  );
  const { data: cityApi, isLoading: cityLoading } = useQuery(
    ["city"],
    getAllCity
  );

  const [selectOption, setSelectedOption] = useState<ApiResponse>(
    {} as ApiResponse
  );

  const filteredCountryList = cityApi?.filter(
    (city) => city?.country_code === selectOption?.code
  );

  return (
    <FormWrapper title="Destinos de Interesse">
      <Autocomplete
        loading={countryLoading}
        multiple
        id="checkboxes-tags-demo"
        options={countryApi || []}
        disableCloseOnSelect
        onChange={(event, newValue) => {
          updatedFields({ country: newValue });
        }}
        getOptionLabel={(option) => {
          setSelectedOption(option);
          return option?.name_ptbr;
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option.code}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option?.name_ptbr}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="País" variant="outlined" />
        )}
      />
      {filteredCountryList && filteredCountryList?.length >= 0 ? (
        <Autocomplete
          loading={cityLoading}
          multiple
          id="checkboxes-tags-demo"
          options={filteredCountryList || []}
          disableCloseOnSelect
          onChange={(event, newValue) => {
            updatedFields({ city: newValue });
          }}
          getOptionLabel={(option) => {
            return option?.name_ptbr;
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.id}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option?.name_ptbr}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Cidade" variant="outlined" />
          )}
        />
      ) : null}
    </FormWrapper>
  );
};
