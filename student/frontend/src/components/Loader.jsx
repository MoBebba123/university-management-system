import ClipLoader from "react-spinners/ClipLoader";
import { Box, Modal } from "@mui/material";
const override = {
  borderColor: "#4cceac",
};

const Loader = ({ loading }) => {
  return (
    <Modal
      open={loading || false}
      aria-labelledby="Loader"
      aria-describedby="Loader"
    >
      <Box
        display="flex"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <ClipLoader
          color=" #00000091"
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Box>
    </Modal>
  );
};

export default Loader;
