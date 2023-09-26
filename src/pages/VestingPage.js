import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useStyles from "../assets/styles";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EarnMoneyImg from "../assets/img/earn.png";
import BoomImg from "../assets/img/boomKey1.png";

//img
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import Config from "../config/app";
import { LoadingButton } from "@mui/lab";

const initalData = {
  amount: 100,
  beneficiary: "0xcbb5b792dF87D2057Bc490BB1f6c9d97cac05312",
  revokable: true,
  slicePeriod: 300,
  duration: 1800,
  cliff: 180,
  start: new Date(),
  vestingCliffCompensation: true,
};

const MyTableRow = (props) => {
  // eslint-disable-next-line
  const {
    activate,
    active,
    account,
    deactivate,
    connector,
    error,
    setError,
    library,
  } = useWeb3React();

  const { index, item } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getContract = async () => {
    const web3 = new Web3(library.provider);
    const contract = new web3.eth.Contract(
      Config.VestingContract.abi,
      Config.VestingContract.address
    );
    return contract;
  };

  const revoke = async (id) => {
    try {
      const contract = await getContract();
      const tx = await contract.methods.revoke(id).send({ from: account });
      console.log(tx);
    } catch (e) {
      console.log(e);
    }
  };

  const release = async (id, amount) => {
    try {
      const contract = await getContract();
      const tx = await contract.methods
        .release(id, amount)
        .send({ from: account });
      console.log(tx);
    } catch (e) {
      console.log(e);
    }
  };

  const convertDate = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  };

  return (
    <TableRow className="created-item" sx={{ marginTop: "10px" }}>
      {console.log(item)}
      <TableCell
        align="center"
        sx={{
          borderTopLeftRadius: "9px!important",
          borderBottomLeftRadius: "9px!important",
        }}
      >
        {index + 1}
      </TableCell>
      <TableCell align="center">{`${item.vestingSchedulesId.substr(
        0,
        8
      )}...${item.vestingSchedulesId.substr(
        item.vestingSchedulesId.length - 8
      )}`}</TableCell>
      <TableCell align="center">{`${item.beneficiary.substr(
        0,
        8
      )}...${item.beneficiary.substr(item.beneficiary.length - 8)}`}</TableCell>
      <TableCell align="center">{convertDate(item.start)}</TableCell>
      <TableCell align="center">
        {convertDate(Number(item.start) + Number(item.duration))}
      </TableCell>
      <TableCell align="center">{convertDate(item.cliff)}</TableCell>
      <TableCell align="center">{item.duration}(s)</TableCell>
      <TableCell align="center">
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          {`${item.released / 100}/${item.amountTotal / 100}`}(
          {item.releaseableAmount / 100})&nbsp;
          <Box component="img" src={BoomImg}></Box>
        </Stack>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          borderTopRightRadius: "9px!important",
          borderBottomRightRadius: "9px!important",
        }}
      >
        {!item.revoked ? (
          <>
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ background: "#2D1C35", borderRadius: "5%" }}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => revoke(item.vestingSchedulesId, index)}>
                Revoke
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>Withdraw</MenuItem> */}
              <MenuItem
                onClick={() =>
                  release(item.vestingSchedulesId, item.releaseableAmount)
                }
              >
                Release
              </MenuItem>
            </Menu>
          </>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
};

const VestingPage = () => {
  const classes = useStyles();
  const [cliffUnit, setCliffUnit] = useState(1);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [durationUnit, setDurationUnit] = useState(1);
  const [slicePeriodUnit, setSlicePeriodUnit] = useState(1);
  const [vestingData, setVestingData] = useState(initalData);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(1);
  const [vestingSchedules, setVestingSchedules] = useState([]);
  // eslint-disable-next-line
  const {
    activate,
    active,
    account,
    deactivate,
    connector,
    error,
    setError,
    library,
  } = useWeb3React();

  const getContract = async () => {
    const web3 = new Web3(library.provider);
    const contract = new web3.eth.Contract(
      Config.VestingContract.abi,
      Config.VestingContract.address
    );
    return contract;
  };
  const create = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const vestingCliffCompensation = true;
      const tx = await contract.methods
        .createVestingSchedule(
          vestingData.beneficiary,
          Math.round(vestingData.start.valueOf() / 1000),
          vestingData.cliff * cliffUnit,
          vestingData.duration * durationUnit,
          vestingData.slicePeriod * slicePeriodUnit,
          vestingData.revokable,
          vestingData.amount * 100,
          vestingData.vestingCliffCompensation
        )
        .send({ from: account });
      console.log(tx);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const load = async () => {
    const contract = await getContract();
    const data = await contract.methods.getVestingSchedules().call();
    setVestingSchedules(data);
  };

  useEffect(() => {
    if (active) {
      load();
    }
  }, [active]);

  return (
    <Box className={classes.home}>
      <Box component="section" className={isMobile ? "hero mobile" : "hero"}>
        <Container>
          <Stack className="token-section" direction="row">
            <Stack direction="row" sx={{ position: "relative" }} spacing={5}>
              <Stack spacing={1}>
                <Typography>TOKEN</Typography>
                <Typography>ADDRESS</Typography>
              </Stack>

              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 600 }}>BOOM</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {Config.BoomToken.address}
                </Typography>
              </Stack>
            </Stack>
            <Box
              component="img"
              sx={{ position: "absolute", right: "-40px", top: "-100px" }}
              src={EarnMoneyImg}
            ></Box>
          </Stack>
          <Stack pt={6}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Create Vesting Schedule
            </Typography>
            <Grid
              container
              alignItems="center"
              direction="row"
              justifyContent="center"
              pt={1}
            >
              <Grid item md={6} sm={8}>
                <Stack className="create-section" p={5} spacing={2}>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} className="title">
                      <Typography variant="caption">AMOUNT</Typography>
                      <ErrorOutlineIcon />
                    </Stack>
                    <TextField
                      type="number"
                      error={Number(vestingData.amount) > 0 ? false : true}
                      helperText={
                        Number(vestingData.amount) > 0
                          ? ""
                          : "Amount can't be 0."
                      }
                      className="custom-input"
                      placeholder="Eg: 120"
                      value={vestingData?.amount}
                      onChange={(e) =>
                        setVestingData({
                          ...vestingData,
                          amount: e.target.value,
                        })
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <Box component="img" src={BoomImg}></Box>&nbsp;SMX
                        </InputAdornment>
                      }
                    />
                  </Stack>

                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} className="title">
                      <Typography variant="caption">BENEFICIARY</Typography>
                      <ErrorOutlineIcon />
                    </Stack>
                    <TextField
                      error={vestingData.beneficiary > 0 ? false : true}
                      helperText={
                        vestingData.beneficiary > 0
                          ? ""
                          : "Beneficiary can't be null."
                      }
                      className="custom-input"
                      placeholder="Eg: 0x3120E153E89B7850B158d1a93d4289066a14ccd5"
                      value={vestingData?.beneficiary}
                      onChange={(e) =>
                        setVestingData({
                          ...vestingData,
                          beneficiary: e.target.value,
                        })
                      }
                    />
                  </Stack>

                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} className="title">
                      <Typography variant="caption">START DATE</Typography>
                      <ErrorOutlineIcon />
                    </Stack>
                    <Stack spacing={1}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          value={vestingData?.start}
                          onChange={(e) =>
                            setVestingData({ ...vestingData, start: e })
                          }
                          minDate={new Date()}
                          minDateTime={new Date()}
                          renderInput={(params) => (
                            <TextField className="custom-input" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </Stack>

                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} className="title">
                      <Typography variant="caption">DURATION</Typography>
                      <ErrorOutlineIcon />
                    </Stack>
                    <Stack spacing={1} direction="row">
                      <TextField
                        type="number"
                        error={vestingData.duration > 0 ? false : true}
                        helperText={
                          vestingData.duration > 0 ? "" : "Duration can't be 0."
                        }
                        className="custom-input"
                        fullWidth
                        placeholder="Eg: 120"
                        value={vestingData?.duration}
                        onChange={(e) =>
                          setVestingData({
                            ...vestingData,
                            duration: e.target.value,
                          })
                        }
                      />
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          className="custom-input"
                          value={durationUnit}
                          onChange={(e) => setDurationUnit(e.target.value)}
                        >
                          <MenuItem value={1}>Second</MenuItem>
                          <MenuItem value={60}>Minute</MenuItem>
                          <MenuItem value={3600}>Hour</MenuItem>
                          <MenuItem value={24 * 3600}>Day</MenuItem>
                          <MenuItem value={30 * 24 * 3600}>Month</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Stack>

                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} className="title">
                      <Typography variant="caption">CLIFF DATE</Typography>
                      <ErrorOutlineIcon />
                    </Stack>
                    <Stack spacing={1} direction="row">
                      <TextField
                        type="number"
                        error={vestingData.cliff > 0 ? false : true}
                        helperText={
                          vestingData.cliff > 0 ? "" : "Cliff can't be null."
                        }
                        className="custom-input"
                        fullWidth
                        placeholder="Eg: 120"
                        value={vestingData?.cliff}
                        onChange={(e) =>
                          setVestingData({
                            ...vestingData,
                            cliff: e.target.value,
                          })
                        }
                      />
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          className="custom-input"
                          value={cliffUnit}
                          onChange={(e) => setCliffUnit(e.target.value)}
                        >
                          <MenuItem value={1}>Second</MenuItem>
                          <MenuItem value={60}>Minute</MenuItem>
                          <MenuItem value={3600}>Hour</MenuItem>
                          <MenuItem value={24 * 3600}>Day</MenuItem>
                          <MenuItem value={30 * 24 * 3600}>Month</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Stack>

                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} className="title">
                      <Typography variant="caption">SLICE PERIOD</Typography>
                      <ErrorOutlineIcon />
                    </Stack>
                    <Stack spacing={1} direction="row">
                      <TextField
                        type="number"
                        error={vestingData.slicePeriod > 0 ? false : true}
                        helperText={
                          vestingData.slicePeriod > 0
                            ? ""
                            : "Slice Period can't be null."
                        }
                        className="custom-input"
                        fullWidth
                        placeholder="Eg: 120"
                        value={vestingData?.slicePeriod}
                        onChange={(e) =>
                          setVestingData({
                            ...vestingData,
                            slicePeriod: e.target.value,
                          })
                        }
                      />
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          className="custom-input"
                          value={slicePeriodUnit}
                          onChange={(e) => setSlicePeriodUnit(e.target.value)}
                        >
                          <MenuItem value={1}>Second</MenuItem>
                          <MenuItem value={60}>Minute</MenuItem>
                          <MenuItem value={3600}>Hour</MenuItem>
                          <MenuItem value={24 * 3600}>Day</MenuItem>
                          <MenuItem value={30 * 24 * 3600}>Month</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Stack>

                  <Grid container>
                    <Grid md={6} item>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} className="title">
                          <Typography variant="caption">Revokable</Typography>
                          <ErrorOutlineIcon />
                        </Stack>
                        <Switch
                          checked={vestingData.revokable}
                          onChange={() =>
                            setVestingData({
                              ...vestingData,
                              revokable: !vestingData.revokable,
                            })
                          }
                        />
                      </Stack>
                    </Grid>
                    <Grid md={6} item>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} className="title">
                          <Typography variant="caption">
                            Vesting Cliff Compensation
                          </Typography>
                          <ErrorOutlineIcon />
                        </Stack>
                        <Switch
                          checked={vestingData.vestingCliffCompensation}
                          onChange={() =>
                            setVestingData({
                              ...vestingData,
                              vestingCliffCompensation:
                                !vestingData.vestingCliffCompensation,
                            })
                          }
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    className="create-button"
                    disabled={!active}
                    onClick={() => create()}
                  >
                    {loading ? "" : "Create"}
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </Stack>

          <Stack pt={3}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Created Vesting Schedules
            </Typography>
            <Stack
              className="created-section"
              px={3}
              pt={1}
              pb={3}
              spacing={3}
              alignItems="center"
            >
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">NO</TableCell>
                      <TableCell align="center">VESTING ID</TableCell>
                      <TableCell align="center">BENEFICIARY</TableCell>
                      <TableCell align="center">START DATE</TableCell>
                      <TableCell align="center">END DATE</TableCell>
                      <TableCell align="center">CLIFF DATE</TableCell>
                      <TableCell align="center">PERIOD</TableCell>
                      <TableCell align="center">
                        RELEASED/TOTAL AMOUNT
                      </TableCell>
                      <TableCell align="center">ACTION</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {
                      vestingSchedules ?
                        vestingSchedules?.map((item, key) => (
                          <MyTableRow key={key} index={key} item={item} />
                        ))
                        :
                        ""
                    } */}
                    {vestingSchedules
                      ? vestingSchedules?.map((item, key) => {
                          if (
                            Number(index) * 10 > key &&
                            key >= (Number(index) - 1) * 10
                          ) {
                            return (
                              <MyTableRow key={key} index={key} item={item} />
                            );
                          }
                        })
                      : ""}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={Math.ceil(vestingSchedules.length / 10)}
                variant="outlined"
                page={index}
                onChange={(e, val) => setIndex(val)}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default VestingPage;
