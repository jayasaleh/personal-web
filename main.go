package main

import (
	"context"
	"fmt"
	"html/template"
	"math"
	"net/http"
	"personal-web/connection"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

type Project struct {
	Id              int64
	ProjectName     string
	StartDate       time.Time
	EndDate         time.Time
	DurationProject string
	Description     string
	Technologies    []string
	Image           string
}

var dataProject = []Project{
	{
		ProjectName: "Dumbways.id Project",
		Description: "Project personal web",
	},
}

func main() {
	e := echo.New()
	connection.DatabaseConnect()
	// akses tampilan
	e.Static("/assets", "assets")

	// routing //
	e.GET("/", home)
	e.GET("/addProject", addProject)
	e.GET("/contact", contact)
	e.GET("/detailProject/:id", projectDetail)
	e.GET("/delete/:id", deleteProject)
	e.POST("/add-project", addDataProject)
	e.Logger.Fatal(e.Start("localhost:5000"))
}

func home(c echo.Context) error {
	var tmpl, err = template.ParseFiles("index.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message:": err.Error()})
	}

	projectdata, _ := connection.Conn.Query(context.Background(), "SELECT id, name, star_date, end_date, technologies, description, image FROM public.tb_projects")

	var result []Project
	for projectdata.Next() {
		var each = Project{}

		err := projectdata.Scan(&each.Id, &each.ProjectName, &each.StartDate, &each.EndDate, &each.Technologies, &each.Description, &each.Image)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
		}
		each.DurationProject = CountDuration(each.StartDate, each.EndDate)
		result = append(result, each)
	}

	//map(tipe data) => key and value
	datas := map[string]interface{}{
		"Project": result,
	}

	return tmpl.Execute(c.Response(), datas)
}

func addProject(c echo.Context) error {
	var tmpl, err = template.ParseFiles("myProject.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message ": err.Error()})
	}

	return tmpl.Execute(c.Response(), nil)
}

func contact(c echo.Context) error {
	var tmpl, err = template.ParseFiles("contact.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message:": err.Error()})
	}
	return tmpl.Execute(c.Response(), nil)
}

func projectDetail(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var tmpl, err = template.ParseFiles("detailProject.html")

	var Detail = Project{}
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message:": err.Error()})
	}
	err = connection.Conn.QueryRow(context.Background(), "SELECT * FROM tb_projects WHERE id= $1", id).Scan(&Detail.Id, &Detail.StartDate, &Detail.EndDate, &Detail.Description, &Detail.Technologies, &Detail.Image)
	Detail.DurationProject = CountDuration(Detail.StartDate, Detail.EndDate)
	fmt.Println(Detail)
	data := map[string]interface{}{
		"Blog": Detail,
	}

	return tmpl.Execute(c.Response(), data)
}

func addDataProject(c echo.Context) error {
	projectName := c.FormValue("projectName")
	desc := c.FormValue("desc")
	start := c.FormValue("start")
	end := c.FormValue("end")
	layout := "2006-01-02"
	start_date, _ := time.Parse(layout, start)
	end_date, _ := time.Parse(layout, end)
	node := c.FormValue("node")
	next := c.FormValue("next")
	reach := c.FormValue("reach")
	typeScript := c.FormValue("typeScript")

	var techList = []string{}
	if node != "" {
		techList = append(techList, node)
	}
	if next != "" {
		techList = append(techList, next)
	}
	if reach != "" {
		techList = append(techList, reach)
	}
	if typeScript != "" {
		techList = append(techList, typeScript)
	}

	var addData = Project{
		ProjectName:  projectName,
		Description:  desc,
		StartDate:    start_date,
		EndDate:      end_date,
		Technologies: techList,
		Image:        "nyanko.jpg",
	}

	sqlQuery := "INSERT INTO tb_projects (name, star_date, end_date, description, technologies, image) VALUES ($1, $2, $3, $4, $5, $6)"
	_, err := connection.Conn.Exec(context.Background(), sqlQuery, addData.ProjectName, addData.StartDate, addData.EndDate, addData.Description, addData.Technologies, addData.Image)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"Message": err.Error()})
	}

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func CountDuration(start time.Time, end time.Time) string {
	timeDifferent := float64(end.Sub(start).Seconds())
	years := int(math.Floor(timeDifferent / (12 * 30 * 24 * 60 * 60)))
	months := int(math.Floor(timeDifferent / (30 * 24 * 60 * 60)))
	weeks := int(math.Floor(timeDifferent / (7 * 24 * 60 * 60)))
	days := int(math.Floor(timeDifferent / (24 * 60 * 60)))

	if years > 0 {
		str := strconv.Itoa(years) + " Tahun"
		return str
	}
	if months > 0 {
		str := strconv.Itoa(months) + " Bulan"
		return str
	}
	if weeks > 0 {
		str := strconv.Itoa(weeks) + " Minggu"
		return str
	}
	if days > 0 {
		str := strconv.Itoa(days) + " Hari"
		return str
	}
	return "cannot get duration"
}

func deleteProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	_, err := connection.Conn.Exec(context.Background(), "DELETE FROM tb_projects WHERE id = $1", id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"Message ": err.Error()})
	}

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func GetDateFormat(t time.Time) string {
	day := strconv.Itoa(t.Day())
	month := t.Month()
	year := strconv.Itoa(t.Year())
	result := fmt.Sprintf("%s %s %s", day, month, year)
	return result
}
