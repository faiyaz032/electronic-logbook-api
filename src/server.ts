import app from './app';

const PORT: number | string = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is alive on PORT:${PORT}`);
});
