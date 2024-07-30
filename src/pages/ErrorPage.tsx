import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export default function ErrorPage() {
    const navigate = useNavigate();
    return (
        <Container
            id="not-found"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 4, sm: 12 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <Box
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Page Not Found.
                </Typography>
                <Button onClick={() => navigate(-1)}>Back</Button>
            </Box>
        </Container>
    );
}