import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  console.log(value,'value')
  return `${value}`;
}

type SalarySliderProps = {
  onChangeValue: (value: number) => void;
};

export default function SalarySlider({ onChangeValue }: SalarySliderProps) {

  const handleChange = (_event: Event, value: number | number[], _activeThumb: number) => {
    console.log(_activeThumb,'')
    onChangeValue(Array.isArray(value) ? value[0] : value);
  }

  return (
    <Box sx={{ width: 150 }}   >
      <Slider
        aria-label="Temperature"
        defaultValue={10}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={0}
        max={100}
        onChange={handleChange}
      />
    </Box>
  );
}

