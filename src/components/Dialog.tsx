import React, {useEffect, useState} from 'react';
import {
    Slide,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Avatar,
    makeStyles, Theme, createStyles,CircularProgress
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import Apis from "../services/Apis";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export function CustomText({label,title,loading}:any) {
    const classes = useStyles();
    return (
        <DialogContentText>
            {label} : {loading?<CircularProgress size={15}/>:<span className={classes.title}>{title}</span>}
        </DialogContentText>
    )
}
export default function AlertDialogSlide({open,item,handleClose}:any) {
    const classes = useStyles();
    const [follower,setFollower] = useState(0);
    const [following,setFollowing] = useState(0);
    const [loading,setLoading] = useState(true);
    useEffect(
        () => {
            async function handleAsync(): Promise<any> {
                let url = "https://api.github.com";
                let follower_uri = item.followers_url.replace(url, "");
                let following_uri = item.following_url.replace(url, "");
                await getFollow(follower_uri, true);
                await getFollow(following_uri.replace('{/other_user}',''), false);
                setLoading(false)
            }
            if(open) {
                handleAsync();
            }
        },[]);
    async function getFollow(uri:string,follower:boolean) {
        await Apis.get(uri)
            .then((rs: any) => {
                    if(follower){
                        setFollower(rs.data.length);
                    }else {
                        setFollowing(rs.data.length)
                    }
            })
    }
    return (
        <div>
            <Dialog
                open={open}
                fullWidth={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Detail"}</DialogTitle>
                <DialogContent>
                    <Avatar className={classes.avatar} alt="" src={item.avatar_url} />
                    <CustomText label={"ID"} title={item.id}/>
                    <CustomText label={"Login name"} title={item.login}/>
                    <CustomText label={"Profile URL"} title={item.html_url}/>
                    <CustomText label={"Follower"} title={follower} loading={loading}/>
                    <CustomText label={"Following"} title={following} loading={loading}/>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            marginBottom:20,
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        title:{
            fontWeight:'bold'
        }
    }),
);
