import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    base: {
        // paddingBottom: theme.spacing(5),
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(91.93deg, #421341 0%, #451E69 47.87%, #400C42 96.74%)",
    },
    appbar: {
        // background: "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(170.05deg, rgba(144, 44, 237, 0.63) 15.16%, rgba(246, 157, 77, 0.63) 259.73%), #000000 !important",
        background: "transparent !important",
        padding: theme.spacing(3, 0),
        boxShadow: "none !important",
        zIndex: 10,
        borderRadius: "9px",
        "& button": {
            textTransform: "none !important"
        },
        "& .toolbar": {
            "& > div": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            },
            "& .amount-text": {
                background: "#220f24",
                padding: "3px 10px",
                borderRadius: "5px",
            },
            "& .defi": {
                background: "#2D1C35",
                backgroundColor: "#2D1C35",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2), 0px 10px 94px rgba(147, 52, 207, 0.2)",
                borderRadius: "9px",
                // border: "1px solid",
                borderImageSlice: "1",
                // borderImage: "linear-gradient(90.06deg, rgba(132, 34, 228, 0.3) 1.08%, rgba(251, 174, 60, 0.3) 99.95%)",
                // backgroundOrigin: "border-box",
                padding: theme.spacing(1),
                // backgroundClip: "content-box, border-box",
                "&:after": {
                    borderRadius: "9px",
                },
                alignItems: 'center'
            },
            "& .header-button": {
                color: "white",
                "&.active": {
                    color: "#b102ff"
                }
            },
            "& .beta": {
                // background: "#2D1C35",
                // background: "linear-gradient(270.28deg, #8F13FF 0.24%, #F6A552 99.76%)",
                background: "linear-gradient(89.95deg, #9429F5 0.01%, #F6A552 99.93%)",
                boxshadow: "0px 4px 20px rgba(228, 61, 255, 0.25)",
                borderRadius: "3px",
                padding: "0px 5px"
                // transform: "rotate(-180deg)",
            },

            "& .custom-button": {
                background: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "0px 10px 94px rgba(147, 52, 207, 0.2)",
                borderRadius: "9px"
            }
        }

    },
    footer: {
        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(170.05deg, rgba(144, 44, 237, 0.63) 15.16%, rgba(246, 157, 77, 0.63) 259.73%), #000000 !important",
        borderRadius: "9px",
        boxShadow: "0px 0px 54px rgba(0, 0, 0, 0.75) important",
        alignItems: "center",
        position: "absolute",
        "& .logo": {
            height: "15px"
        }
    },
    home: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        "& .token-section": {
            padding: theme.spacing(7),
            background: "linear-gradient(270deg, #781E87 0%, #69229C 100%)",
            borderRadius: "20px",
        },
        "& .create-section": {
            background: "#2D1C35",
            boxShadow: "0px 10px 94px rgba(147, 52, 207, 0.2)",
            borderRadius: "9px",
            "& .title": {
                "& svg": {
                    fontSize: "1rem",
                    color: "#979797"
                    // transform: "scale(0.7)"
                }
            },
            // "& .custom-input": {
            //     background: "linear-gradient(89.24deg, rgba(144, 44, 237, 0.08) 0.68%, rgba(246, 157, 77, 0.08) 99.4%), #000000",
            //     borderRadius: "9px"
            // },
            "& .create-button": {
                background: "linear-gradient(89.95deg, #8F13FF 0.01%, #F6A552 99.93%)",
                borderRadius: "9px",
                height: "45px",
                color: "white"
            }
        },
        "& .created-section": {
            marginTop: theme.spacing(2),
            // padding: theme.spacing(2),
            borderRadius: "9px",
            background: "#2D1C35",
            "& td": {
                border: "none !important",
                padding: "16px 0px !important"
            },
            "& .created-item": {
                borderRadius: "9px",
                background: "#190821"
            }
        },
        "& .hero": {
            "& > div": {
                position: "relative",
                height: "100%"
            },
            "& .presale": {
                background: "linear-gradient(89.95deg, #9429F5 0.01%, #F6A552 99.93%)",
                boxshadow: "0px 4px 20px rgba(228, 61, 255, 0.25)",
                borderRadius: "5px",
                padding: "0px 5px",
                color: "white"
            },
            "& .item": {
                background: "#2D1C35",
                borderRadius: "5px",
                border: "1px solid",
                borderImageSlice: "1",
                borderImage: "linear-gradient(90.06deg, rgba(132, 34, 228, 0.3) 1.08%, rgba(251, 174, 60, 0.3) 99.95%)",
                height: "100%",
                boxShadow: "0px 10px 94px rgba(147, 52, 207, 0.2)",
                padding: theme.spacing(3),
                "& .text": {
                    color: "white",
                    // fontWeight: 600
                },
                "& p": {
                    color: "white"
                },
                "& .claim-button": {
                    background: "linear-gradient(89.95deg, #9429F5 0.01%, #F6A552 99.93%)",
                    height: "50px",
                    borderRadius: "5px"
                },
                "& .progress": {
                    backgroundColor: "#000000",
                    "& .css-17282r-MuiLinearProgress-bar1": {
                        background: "linear-gradient(89.95deg, #8F13FF 0.01%, #F6A552 99.93%)",
                    }
                }
            }
        }
    }
}));

export default useStyles;