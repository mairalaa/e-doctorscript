import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from "@material-ui/core/TableHead/TableHead";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import UpdateMedicine from './../updateMedicine';
import { Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from "@material-ui/core/Fab/Fab";



const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '96%',
    marginTop: theme.spacing.unit * 12,
    marginLeft:'2%'
  },
  table: {
    minWidth: 500,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  medicineListSearch: {
    padding: 10,
  },
  TableCell:{
    '&:hover': {
      background:'#f0f0f0',
      cursor:'pointer',
    }
  },
  iconBtn:{
    '&:hover': {
      background:'#f0f0f0',
      cursor:'pointer',
    }
  }
});

class MedicineTableView extends React.Component {
  constructor(props) {
    super(props);
    console.log('In Medicine Table View');
    this.state = {
      rows: [],
      page: 0,
      rowsPerPage: 10,
      searchOn:false,
      filtered:[],
      UpdateDialog: false,
      medDetails:'',
      deleteDialog:false,
      deletableMed:''
    };
  }

  componentWillMount(){
    this.setState({
      rows : this.props.medicineState.medicineList
    });
  }

  componentDidUpdate(prevProps) {
    console.log("Updating Table view Component");
    if (this.props.medicineState.medicineList !== prevProps.medicineState.medicineList) {
      this.setState({
        rows : this.props.medicineState.medicineList
      })
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  SearchMedicine = event =>{
    let keyword = event.target.value;
    this.setState({
      searchOn:true
    });
    if (this.state.rows.length !== 0){
      let filtered = this.state.rows.filter((item)=>{
        return item.product_name.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
      });
      this.setState({
        filtered:filtered,
        searching:true
      })
    }
  }



  handleShowUpdateDialog=(obj)=>{
    this.setState({
      UpdateDialog:true,
      medDetails:obj
    })
  };
  handleClose = () => {
    this.setState({ UpdateDialog: false });
  };
  handleDeleteMedicine=(med)=>{
    console.log("Delete medicine : ", med.medicine_id);
    this.props.deleteMedicine(med.medicine_id);
  };

  render() {
    const { classes , updateMedicine} = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    let medTable;
    if (rows.length !== 0){
      medTable = !this.state.searchOn ?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map( (medicine, index) => {
        return(
          <TableRow key={index} className={classes.TableCell}>
            <TableCell  onClick={()=>this.handleShowUpdateDialog(medicine)} component="th" scope="row">{medicine.product_name}</TableCell>
            <TableCell onClick={()=>this.handleShowUpdateDialog(medicine)} component="th" scope="row">{medicine.types}</TableCell>
            <TableCell onClick={()=>this.handleShowUpdateDialog(medicine)} component="th" scope="row">{medicine.generic}</TableCell>
            <TableCell onClick={()=>this.handleShowUpdateDialog(medicine)} component="th" scope="row">{medicine.strength}</TableCell>
            <TableCell onClick={()=>this.handleShowUpdateDialog(medicine)} component="th" scope="row">{medicine.indication}</TableCell>
            <TableCell component="th" scope="row">
            <Tooltip title="Delete">
              <IconButton onClick={()=>this.handleDeleteMedicine(medicine)} style={{hoverColor:'#c62929'}}>
                  <DeleteIcon />
                </IconButton>
            </Tooltip>
            </TableCell>
          </TableRow>
        )
      }):this.state.filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((medicine, index) => {
        return(
          <TableRow key={index} className={classes.TableCell} >
            <TableCell onClick={()=>this.handleShowUpdateDialog(medicine)}  component="th" scope="row" >{medicine.product_name}</TableCell>
            <TableCell onClick={()=>this.handleShowUpdateDialog(medicine)}  component="th" scope="row" >{medicine.types}</TableCell>
            <TableCell onClick={()=>this.handleShowUpdateDialog(medicine)} component="th" scope="row" >{medicine.generic}</TableCell>
            <TableCell onClick={()=>this.handleShowUpdateDialog(medicine)} component="th" scope="row" >{medicine.strength}</TableCell>
            <TableCell onClick={()=>this.handleShowUpdateDialog(medicine)} component="th" scope="row" >{medicine.indication}</TableCell>
            <TableCell component="th" scope="row">
              <Tooltip title="Delete">
                <IconButton onClick={()=>this.handleDeleteMedicine(medicine)} className={classes.iconBtn}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        )
      });
    }

    return (
      <Paper className={classes.root}>
        <div className={classes.medicineListSearch}>
        <InputBase className={classes.input} placeholder="Search Medicine" onChange={this.SearchMedicine} />
        <IconButton className={classes.iconButton} aria-label="Search" disabled>
          <SearchIcon />
        </IconButton>
        </div>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Generic</TableCell>
                <TableCell>Strength</TableCell>
                <TableCell>Indication</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medTable}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={2}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        {/* Details and Update Dialog */}
        <Dialog
            open={this.state.UpdateDialog}
            onClose={this.handleClose}
          >
          <UpdateMedicine
            name={"Normal Medicine"}
            obj={this.state.medDetails}
            updateMedicine={updateMedicine}
            handleUpdateDialogue={this.handleClose}
          />
          <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Ok
              </Button>
            </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

MedicineTableView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MedicineTableView);
