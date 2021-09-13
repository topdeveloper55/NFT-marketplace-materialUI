import React, { useState, useEffect } from "react";
import axios from 'axios'
import { TextField, Grid } from '@material-ui/core';
import { concatinate, getAssets } from "../../context/counterReducer";
import { useSelector, useDispatch } from "react-redux";
import CardItem from "../../components/CardItem";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {

  const [searchText, setSearchText] = useState('');
  const [ offset, setOffset ] = useState(0);
  const [ hasMore, setHasMore ] = useState(true);
  const assets = useSelector(getAssets);
  const [ assetsToDisplay, setAssetsToDisplay ] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    loadMoreAssets(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const loadMoreAssets = (offset) => {
    axios.get(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${offset}&limit=20`)
    .then(res => {
      dispatch(concatinate(res.data.assets));
      if(res.data.assets.length < 20) setHasMore(false);
      setOffset(offset + 1);
    })
    .catch(err => {
      console.log("err->>", err);
    })
  }
  
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
  useEffect(() => {
    if(searchText !== "" && assets)
    {
      const _assetsToDisplay = assets.filter( asset => {
        if(asset.name === null) return false;
        const name = asset.name.trim().toLowerCase();
        if(name.includes(searchText.trim().toLowerCase())) return true;
        else return false;
      });
      setAssetsToDisplay(_assetsToDisplay);
    }
    else setAssetsToDisplay(assets);
  }, [assets, searchText])
  return (
    <div id="home" >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 20
        }}
      >
        <TextField id="standard-basic" value={searchText} onChange={handleChange} label="Search Name" />
      </div>
      
        <InfiniteScroll
          dataLength={assets.length}
          next={ () => loadMoreAssets(offset)}
          hasMore={hasMore}
          loader={<div className="lazy-loading"><div className="lds-ripple"><div></div><div></div></div></div>}
          // scrollableTarget="home"
          className="infinite-scroll-wrapper"
        >
          <Grid container spacing={3} >
            {assetsToDisplay.map((asset, index) => {
            return(
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <CardItem asset={asset} />
              </Grid>)
              }
            )}
          </Grid>
        </InfiniteScroll>
    </div>
  );
};