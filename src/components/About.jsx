const About = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "centre",
        height: "100vh",
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/abstract-red-wavy-business-style-background_573652-299.jpg?w=1060')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          textAlign: "center  ",
        }}
      >
        About Us
      </h1>
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            marginLeft: "23rem",
            marginRight: "23rem",
            fontSize: "1.5rem",
            fontWeight: "450",
          }}
        >
          Sustainable commute programs are becoming increasingly important as
          the world faces the challenges of climate change and air pollution.
          These programs aim to reduce the environmental impact of commuting by
          encouraging employees to use more sustainable transportation options.
          Employers can play a significant role in promoting sustainable
          commuting by offering incentives and providing access to sustainable
          transportation options.
        </p>
        <p
          style={{
            marginLeft: "23rem",
            marginRight: "23rem",
            fontSize: "1.5rem",
            marginTop: "2rem",
            fontWeight: "450",
          }}
        >
          These programs can take many forms, such as carpooling, public
          transportation, biking, or walking, and employers can incentivize
          employees to participate in the program by offering rewards or
          benefits. Employers can also provide resources and support, such as
          providing secure bike storage or offering discounted public
          transportation passes.
        </p>
      </div>
    </div>
  );
};

export default About;
