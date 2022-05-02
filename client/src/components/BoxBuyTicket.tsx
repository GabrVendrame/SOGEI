import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material';
import * as React from 'react';
import '../styles/BoxBuyTicket.css';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import MuiStyles from '../styles/MuiStyles';
import { PresentationData } from './PresentationsBox';
import { EventData } from './Itens';
import api from '../services/api';
import { User } from '../pages/HomePageUser';

interface Props {
  // boxBuyTicketDisplay: string;
  // setBoxBuyTicketDisplay: React.Dispatch<React.SetStateAction<string>>;
  // rightContainerGridRef: React.MutableRefObject<any>;
  setShowComponent: React.Dispatch<React.SetStateAction<boolean>>
  presentationData: PresentationData;
  eventData: EventData;
  user: User;
}
interface TicketsData {
  eventTicket: number,
  presentationTicket: number,
}

const BoxBuyTicket: React.FC<Props> = ({
  // boxBuyTicketDisplay,
  // setBoxBuyTicketDisplay,
  // rightContainerGridRef,
  setShowComponent,
  presentationData,
  eventData,
  user,
}) => {
  // const displayBoxBuyTickectRef = React.useRef<any>(null);
  const [ticketData, setTicketData] = React.useState<TicketsData>({
    eventTicket: 0,
    presentationTicket: 0,
  });
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  // const [disableBuyTicket, setDisableBuyTicket] = React.useState<boolean>(true);
  const theme = MuiStyles;
  // console.log(`display: ${boxBuyTicketDisplay}`);

  const changeRightGrid = () => {
    // setBoxBuyTicketDisplay('none');
    // rightContainerGridRef.current.style.display = 'flex';
    setShowComponent(false);
  };

  const buyTicket = () => {
    // Axios.put("http://localhost:3001/api/users/update", values)
    console.log(user.email);
    const data = {
      presentationId: presentationData._id,
      eventId: eventData._id,
      userEmail: user.email,
    };
    api.put('/users/buyTicket/', data).then((response) => {
      // setPresentations(response.data);
      // console.log(response.data);
    });
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const ConfirmDialogLoginRequest: React.FC = () => {
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Comprar ingresso</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            É necessário estar logado em uma conta como usuário comum para
            realizar a compra de um ingresso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' autoFocus onClick={handleCloseConfirmDialog}>
            Cancelar
          </Button>
          <Link to={'/LoginAndRegister'} style={{ textDecoration: 'none' }}>
            <Button
              color='secondary'
            >Realizar Login
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    );
  };

  const ConfirmDialogBuyTicket: React.FC = () => {
    const totalPrice = (presentationData.value! * ticketData.presentationTicket)
      + (eventData.value! * ticketData.eventTicket);
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        // maxWidth="xs"
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Finalizar Compra</DialogTitle>
        <DialogContent dividers>
          {/* <DialogContentText> */}
          <Box className='buyTicketsDialogInfo'>
            <Box className='eventsInfo'>
              <Typography variant='h5' color='secondary' sx={{ fontWeight: 'bold' }}>
                Dados do evento
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }}>
                <span style={{ color: '#DEC0F7' }}>
                  Título
                </span> - {eventData.title}
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }}>
                <span style={{ color: '#DEC0F7' }}>
                  Número de ingressos
                </span> - {ticketData.eventTicket}
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }}>
                <span style={{ color: '#DEC0F7' }}>
                  Preço unitário
                </span> - R$ {eventData.value?.toFixed(2)}
              </Typography>
            </Box>
            {/* <Divider orientation='vertical' flexItem/> */}
            <Box className='presentationInfo'>
              <Typography variant='h5' color='secondary' sx={{ fontWeight: 'bold' }}>
                Dados da apresentação
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }}>
                <span style={{ color: '#DEC0F7' }}>
                  Título
                </span> - {presentationData.title}
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }}>
                <span style={{ color: '#DEC0F7' }}>
                  Número de ingressos
                </span> - {ticketData.presentationTicket}
              </Typography>
              <Typography sx={{ mt: 2, mb: 2 }}>
                <span style={{ color: '#DEC0F7' }}>
                  Preço unitário
                </span> - R$ {presentationData.value?.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Typography variant='h6' sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>
            Preço total
            - <span style={{ color: '#4caf50' }}> R$ {totalPrice.toFixed(2)}</span>
          </Typography>

          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button color='secondary' autoFocus onClick={handleCloseConfirmDialog}>
            Cancelar
          </Button>
          <Link to={'/LoginAndRegister'} style={{ textDecoration: 'none' }}>
            <Button
              color='secondary'
              onClick={() => buyTicket()}
            >Confirmar
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    );
  };

  const RightTicketInputs = (category: string) => {
    let ticket: number = 0;
    let disableButton = true;

    category === 'evento'
      ? (ticket = ticketData.eventTicket,
      ticket > 0
        ? disableButton = false
        : disableButton = true
      )
      : (ticket = ticketData.presentationTicket,
      ticket > 0
        ? disableButton = false
        : disableButton = true);

    return (
      <Box className='buyTicketInputs'>
        <Grid item md={5}>
          <Typography color='primary' sx={{ mt: 2, mb: 2 }}>
            Selecione o número de ingressos - ({category})
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Box className='rightGridInputs'>
            <TextField
              id="ticketInput"
              variant="outlined"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', readOnly: true }}
              value={ticket}
            />
            <Box className='ticketButtonsWrapper'>
              <Button
                onClick={() => {
                  category === 'evento' ? setTicketData({
                    ...ticketData,
                    eventTicket: ticketData.eventTicket - 1,
                  }) : setTicketData({
                    ...ticketData,
                    presentationTicket: ticketData.presentationTicket - 1,
                  });
                }}
                color='error'
                variant='contained'
                disabled={disableButton}>-1</Button>
              <Button
                onClick={() => {
                  category === 'evento' ? setTicketData({
                    ...ticketData,
                    eventTicket: ticketData.eventTicket + 1,
                  }) : setTicketData({
                    ...ticketData,
                    presentationTicket: ticketData.presentationTicket + 1,
                  });
                }}
                color='terceary'
                variant='contained'
              >+1</Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
        Selecionado - {presentationData.title}
      </Typography>
      <Box className='rightGridContent'>
        <Grid container rowGap={2} columns={{ sm: 8, md: 8 }}>
          <Grid item md={8}>
          </Grid>
          {RightTicketInputs('evento')}
          {RightTicketInputs('apresentação')}
        </Grid>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '15px',
        padding: '5px 0px',
      }}>
        <Button onClick={() => changeRightGrid()} color='secondary'>Voltar</Button>
        {(ticketData.eventTicket === 0)
          ? <Tooltip arrow title="Mínimo de um ingresso de evento necessário.">
            <span>
              <Button
                onClick={handleOpenConfirmDialog}
                disabled={true}
                color='secondary'>Finalizar Compra</Button>
            </span>
          </Tooltip>
          : <Button
            onClick={handleOpenConfirmDialog}
            disabled={false}
            color='secondary'>Finalizar Compra</Button>
        }
        {user
          ? <ConfirmDialogBuyTicket />
          : <ConfirmDialogLoginRequest />}
      </Box>
    </ThemeProvider>
  );
};

export default BoxBuyTicket;
