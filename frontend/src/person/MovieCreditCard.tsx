import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Avatar,
  List,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import * as movieUtils from "../movie/utils";
import { actions } from "../redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { ImagePaths } from "../tmdb/types";
import ReadMore from "../common/components/ReadMoreTypography";
import MovieIcon from "@material-ui/icons/Movie";
type Credit = ImagePaths & {
  id: string;
  title: string;
  releaseDate: string;
  overview: string;
};

type Cast = Credit & { character: string };

type Crew = Credit & { job: string; department: string };

export default ({ credit }: { credit: Cast | Credit }) => {
  const dispatch = useDispatch();
  const sutitle1 = [movieUtils.toReleaseYear(credit)].join(
    movieUtils.SMALL_DOT
  );

  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/movie/${credit.id}` }));
  };

  const image = makeTMDbImageURL(
    3,
    credit.backdropPath
      ? { backdropPath: credit.backdropPath }
      : { posterPath: credit.posterPath }
  );
  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardHeader title={credit.title} subheader={sutitle1} />

        {image && (
          <CardMedia style={{ height: 0, paddingTop: "52%" }} image={image} />
        )}
      </CardActionArea>
      <CardContent>
        <Typography style={{ fontWeight: "bold" }}>Overview</Typography>
        <ReadMore
          text={credit.overview}
          variant="body1"
          color="textSecondary"
        />
      </CardContent>
    </Card>
  );
};
