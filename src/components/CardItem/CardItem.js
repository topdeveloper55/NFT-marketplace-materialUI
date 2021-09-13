import { Card, CardActionArea, CardContent, CardMedia, Fade,  Typography } from '@material-ui/core';
import React from 'react';

const CardItem = ( props ) => {
    const { asset } = props;
    return(
        <Fade in timeout={ {enter: 1500, exit: 1000,}}>
            <Card onClick={()=>window.open(asset.permalink, "_blank")}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={asset.name}
                        image={asset.image_url}
                        height="400"
                        title={asset.description}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        {asset.name}
                        </Typography>           
                    </CardContent>
                </CardActionArea>
            </Card>
        </Fade>
    )
}

export default CardItem;