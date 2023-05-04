module.exports = (env) => {
  if (env.dev){
    return require(`./webpack.dev.js`)
  } else {
    return require(`./webpack.publish.js`)
  }
}
