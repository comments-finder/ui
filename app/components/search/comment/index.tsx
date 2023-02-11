import styles from './styles.module.css';

export type Comment = {
  articleLink: string;
  articleTitle: string;
  text: string;
  publicationDate: string;
};

const CommentComp = ({ text, articleLink, articleTitle, publicationDate }: Comment) => {
  return (
    <li className={styles.row} key={`${text}${articleLink}`}>
      {text}
      <br/>
      {publicationDate}
      <br />[
      <small>
        <a target="_blank" href={articleLink} rel="noreferrer">
          {articleTitle}
        </a>
      </small>
      ]
    </li>
  );
};

export default CommentComp;