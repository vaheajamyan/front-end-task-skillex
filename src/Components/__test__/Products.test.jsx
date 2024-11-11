import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Products from '../Products';

describe('Products Tests', () => {
  test('**Rendering of components**: Ensure the product catalog and filter components render correctly.', async () => {
    render(<Products/>);
    
//catalog filter//
    const CheckboxElectronics = screen.getByRole('checkbox', {name: 'Electronics'});
    expect(CheckboxElectronics).toBeInTheDocument();    

    const CheckboxFootwear = screen.getByRole('checkbox', {name: 'Footwear'});
    expect(CheckboxFootwear).toBeInTheDocument();    

    const CheckboxClothing = screen.getByRole('checkbox', {name: 'Clothing'});
    expect(CheckboxClothing).toBeInTheDocument();

//brand filter//
    const CheckboxBrandA = screen.getByRole('checkbox', {name: 'Brand A'});
    expect(CheckboxBrandA).toBeInTheDocument();

    const CheckboxBrandB = screen.getByRole('checkbox', {name: 'Brand B'});
    expect(CheckboxBrandB).toBeInTheDocument();

    const CheckboxBrandC = screen.getByRole('checkbox', {name: 'Brand C'});
    expect(CheckboxBrandC).toBeInTheDocument();

    const CheckboxBrandD = screen.getByRole('checkbox', {name: 'Brand D'});
    expect(CheckboxBrandD).toBeInTheDocument();

    const CheckboxBrandE = screen.getByRole('checkbox', {name: 'Brand E'});
    expect(CheckboxBrandE).toBeInTheDocument();

//rating filter//
    const ratingButtonsNotIndicated = screen.getAllByTestId('StarBorderIcon');
    ratingButtonsNotIndicated.forEach((star) =>  expect(star).toBeInTheDocument());
    const ratingButtonsIndicated = screen.queryAllByTestId('StarIcon');    
    ratingButtonsIndicated.forEach((star) =>  expect(star).not.toBeInTheDocument());

//price range slider filter// 
    const PriceRangeSlider = screen.getByTestId('Slider-price-range-testid');
    expect(PriceRangeSlider).toBeInTheDocument();
    expect(PriceRangeSlider.lastChild).toHaveAttribute('data-index', '1');

//product catalog//   
    //const table = await waitFor(() => screen.getByTestId('Table-testid'), {timeout: 1200});
    //expect(table).toBeInTheDocument();
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('**No products found**: Test the behavior when no products match the filter criteria.', async () => {
    const user = userEvent.setup()
    render(<Products/>);

    const CheckboxElectronics = screen.getByRole('checkbox', {name: 'Electronics'});    
    expect(CheckboxElectronics).not.toBeChecked();
    const CheckboxBrandD = screen.getByRole('checkbox', {name: 'Brand D'});    
    expect(CheckboxBrandD).not.toBeChecked();
    const ratingButtonsNotIndicated = screen.getAllByTestId('StarBorderIcon');
    ratingButtonsNotIndicated.forEach((star) =>  expect(star).toBeInTheDocument());

    await user.click(CheckboxElectronics);
    expect(screen.getByRole('checkbox', {name: 'Electronics'})).toBeChecked();
    await user.click(CheckboxBrandD);
    expect(screen.getByRole('checkbox', {name: 'Brand D'})).toBeChecked();
    expect(await waitFor(() => screen.getByTestId('Table-testid'), {timeout: 700})).toBeInTheDocument();
    fireEvent.click(ratingButtonsNotIndicated[3]);
    expect(await waitFor(() => screen.getByText(/No products/i), {timeout: 700})).toHaveTextContent('No products found');
    fireEvent.click(ratingButtonsNotIndicated[4]);
    expect(await waitFor(() => screen.getByTestId('Table-testid'), {timeout: 700})).toBeInTheDocument();
  });
})

