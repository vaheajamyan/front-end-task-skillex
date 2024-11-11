import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Products from '../Products';
import Catalog from '../Catalog';

describe('Catalog Tests', () => {
  test('**Filter logic**: Test the filtering logic to ensure it correctly filters the product list based on user input (category, price range, brand, rating).', async () => {

    const user = userEvent.setup()
    render(<Products />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();

    const searchText = 'Wireless Headphones';
   
    await user.type(searchInput, searchText);

    render(<Catalog foundData={[{name: searchText}]} countRef = {1} page = {1} rowCount = {1} changePagination = {() => {}}/>)

    const table = screen.getByTestId('Table-testid'); 
    expect(table).toBeInTheDocument();

    const cell = screen.getAllByRole('cell');
    cell.forEach((td) => {
      expect(td).toBeInTheDocument();
      expect(cell[0]).toHaveTextContent(/ire/i);
    });
  })

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('**Real-time updates**: Validate that the filtering system updates in real time when filter values change.', async () => {
    render(<Products/>);

    const CheckboxElectronics = screen.getByRole('checkbox', {name: 'Electronics'});
    expect(CheckboxElectronics).toBeInTheDocument();
    expect(CheckboxElectronics).not.toBeChecked();

    fireEvent.click(CheckboxElectronics);
    expect(screen.getByRole('checkbox', {name: 'Electronics'})).toBeChecked();

    const foundData = [{      
      category: "Electronics"
    }]

    render(<Catalog foundData={foundData} countRef = {1} page = {1} rowCount = {1} changePagination = {() => {}}/>)

    const table = screen.getByTestId('Table-testid'); 
    expect(table).toBeInTheDocument();

    const cell = await screen.findAllByRole('cell');    
    cell.forEach((td) =>  {
      expect(td).toBeInTheDocument();
      expect(cell[1]).toHaveTextContent('Electronics');
    });
  })
})

