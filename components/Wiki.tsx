import { Button, Hidden } from '@material-ui/core';
import { OpenOutside } from '.';
import { BookOutlinedIcon, IconButton } from './Icons';

export interface WikiProps {
  className?: string;
}

const Wiki: React.SFC<WikiProps> = ({ className }) => {
  return (
    <>
      <OpenOutside
        title='OrangeFox Wiki'
        className={className}
        href='https://wiki.orangefox.tech'
      >
        <Hidden smUp implementation='css'>
          <IconButton color='inherit' edge='end' aria-label='Open Wiki link'>
            <BookOutlinedIcon />
          </IconButton>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Button
            color='primary'
            className='wikiButton'
            startIcon={<BookOutlinedIcon className='bigIcon' />}
          >
            Wiki
          </Button>
        </Hidden>
      </OpenOutside>
    </>
  );
};

export { Wiki };
