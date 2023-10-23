import React, { useState } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardContent
} from "@mui/material";

const cardContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh"
};

const cardStyle = {
  maxWidth: 400,
  padding: "16px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px"
};

const nextButtonStyle = {
  backgroundColor: "#AD7826",
  color: "white"
};

const optionBoxStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center"
};

const topStepContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "16px"
};

const steps = [
  "Step 1",
  "Step 2",
  "Step 3",
  "Step 4",
  "Step 5",
  "Step 6",
  "Step 7",
  "Step 8",
  "Step 9",
  "Step 10",
  "Step 11"
];

const questions = [
  {
    question: "1. How do you define your scalp type?",
    options: ["Dry", "Oily", "Normal"]
  },
  {
    question: "2. Define your hair texture",
    options: ["Fine (Thin)", "Medium", "Coarse (Thick)"]
  },
  {
    question: "3.How frequently do you wash your hair",
    options: ["Once a week", "2-3 times a week", "Everyday"]
  },
  {
    question: "4.Define your hair type",
    options: ["Straight", "Wavy", "Curly", "Coils"]
  },
  {
    question: "5.How much hair do you lose everyday",
    options: ["A few strands", "A dozen strands", "More than a dozen strands"]
  },
  {
    question: "6.How do you describe the oiliness of your scalp",
    options: ["Dry", "Oily", "Balanced", "Vey oily"]
  },
  {
    question: "7.How often do you experience itchiness in your scalp",
    options: ["Never", "Rarely", "Quite often", "Everyday"]
  },
  {
    question: "8.Do you have any of the following conditions",
    options: [
      "Dandruff",
      "Scalp psoriasis",
      "Seborrheic dermatitis",
      "None of the above"
    ]
  },
  {
    question: "9.How often do you observe dandruff flakes",
    options: ["Never", "Rarely", "Quite often", "Everyday"]
  },
  {
    question: "10.Have you undergone any of the following treatments?",
    options: ["Colour", "Permanent waves/curls", "Keratin", "None of the above"]
  },
  {
    question: "11.Choose your hair goals",
    options: [
      "Frizz Control",
      "Hair breakage control",
      "Scalp detox",
      "Damage repair",
      "Shine and volume boost",
      "Dandruff/ Psoriasis/ Dermatitis control",
      "Deep conditioning"
    ]
  }
];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleNext = () => {
    if (activeStep < questions.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleOptionClick = (option, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const isLastStep = activeStep === questions.length - 1;

  const handleFormSubmit = () => {
    if (!isLastStep) {
      handleNext();
      setSelectedOptions(Array(questions.length).fill(null));
    } else {
      setShowSuccessMessage(true);
    }
  };

  return (
    <Container>
      <div style={topStepContainerStyle}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div style={cardContainerStyle}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6">
              {questions[activeStep].question}
            </Typography>
            <List>
              {questions[activeStep].options.map((option, index) => (
                <ListItem key={option}>
                  <ListItemButton>
                    <div
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "8px",
                        margin: "8px",
                        cursor: "pointer",
                        textAlign: "center",
                        backgroundColor:
                          selectedOptions[activeStep] === option
                            ? "#BA822B"
                            : "white",
                        ...optionBoxStyle
                      }}
                      onClick={() => handleOptionClick(option, activeStep)}
                    >
                      {option}
                      {selectedOptions[activeStep] === option && (
                        <span
                          role="img"
                          aria-label="tick"
                          style={{ marginLeft: "5px" }}
                        >
                          ✔️
                        </span>
                      )}
                    </div>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <div style={buttonContainerStyle}>
              {activeStep > 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={nextButtonStyle}
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              {activeStep === questions.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={nextButtonStyle}
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={nextButtonStyle}
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      {showSuccessMessage && (
        <Typography variant="h6" style={{ marginTop: "16px" }}>
          Successfully submitted the form!
        </Typography>
      )}
    </Container>
  );
}

export default App;
