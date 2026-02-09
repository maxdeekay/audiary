using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ExtractAlbumEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollectionAlbums_Genres_GenreId",
                table: "CollectionAlbums");

            migrationBuilder.DropForeignKey(
                name: "FK_CollectionAlbums_SubGenres_SubGenreId",
                table: "CollectionAlbums");

            migrationBuilder.DropTable(
                name: "SubGenres");

            migrationBuilder.DropTable(
                name: "Genres");

            migrationBuilder.DropIndex(
                name: "IX_CollectionAlbums_GenreId",
                table: "CollectionAlbums");

            migrationBuilder.DropIndex(
                name: "IX_CollectionAlbums_SubGenreId",
                table: "CollectionAlbums");

            migrationBuilder.DropColumn(
                name: "Artist",
                table: "CollectionAlbums");

            migrationBuilder.DropColumn(
                name: "CoverUrl",
                table: "CollectionAlbums");

            migrationBuilder.DropColumn(
                name: "GenreId",
                table: "CollectionAlbums");

            migrationBuilder.DropColumn(
                name: "SubGenreId",
                table: "CollectionAlbums");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "CollectionAlbums");

            migrationBuilder.RenameColumn(
                name: "ReleaseYear",
                table: "CollectionAlbums",
                newName: "AlbumId");

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "CollectionAlbums",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateTable(
                name: "Albums",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MusicBrainzId = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Artist = table.Column<string>(type: "text", nullable: false),
                    CoverUrl = table.Column<string>(type: "text", nullable: true),
                    Genre = table.Column<string>(type: "text", nullable: true),
                    ReleaseYear = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Albums", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CollectionAlbums_AlbumId",
                table: "CollectionAlbums",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_Albums_MusicBrainzId",
                table: "Albums",
                column: "MusicBrainzId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CollectionAlbums_Albums_AlbumId",
                table: "CollectionAlbums",
                column: "AlbumId",
                principalTable: "Albums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CollectionAlbums_Albums_AlbumId",
                table: "CollectionAlbums");

            migrationBuilder.DropTable(
                name: "Albums");

            migrationBuilder.DropIndex(
                name: "IX_CollectionAlbums_AlbumId",
                table: "CollectionAlbums");

            migrationBuilder.RenameColumn(
                name: "AlbumId",
                table: "CollectionAlbums",
                newName: "ReleaseYear");

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "CollectionAlbums",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Artist",
                table: "CollectionAlbums",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CoverUrl",
                table: "CollectionAlbums",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GenreId",
                table: "CollectionAlbums",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SubGenreId",
                table: "CollectionAlbums",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "CollectionAlbums",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Genres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genres", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubGenres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GenreId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubGenres", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubGenres_Genres_GenreId",
                        column: x => x.GenreId,
                        principalTable: "Genres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Genres",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Pop & Mainstream" },
                    { 2, "Rock" },
                    { 3, "Metal" },
                    { 4, "Elektronisk musik" },
                    { 5, "Hip hop & R&B" },
                    { 6, "Jazz & Blues" },
                    { 7, "Folkmusik & Världsmusik" },
                    { 8, "Klassiskt" },
                    { 9, "Övrigt / Nisch" }
                });

            migrationBuilder.InsertData(
                table: "SubGenres",
                columns: new[] { "Id", "GenreId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Pop" },
                    { 2, 1, "Indie pop" },
                    { 3, 1, "Synthpop" },
                    { 4, 1, "K-pop" },
                    { 5, 1, "Schlager" },
                    { 6, 2, "Rock" },
                    { 7, 2, "Hårdrock" },
                    { 8, 2, "Alternativ rock" },
                    { 9, 2, "Punk rock" },
                    { 10, 2, "Progressiv rock" },
                    { 11, 2, "Psykedelisk rock" },
                    { 12, 3, "Heavy metal" },
                    { 13, 3, "Death metal" },
                    { 14, 3, "Black metal" },
                    { 15, 3, "Power metal" },
                    { 16, 3, "Doom metal" },
                    { 17, 3, "Metalcore" },
                    { 18, 4, "House" },
                    { 19, 4, "Techno" },
                    { 20, 4, "Trance" },
                    { 21, 4, "Drum and bass" },
                    { 22, 4, "Dubstep" },
                    { 23, 4, "Ambient" },
                    { 24, 5, "Hip hop" },
                    { 25, 5, "Rap" },
                    { 26, 5, "Trap" },
                    { 27, 5, "R&B" },
                    { 28, 5, "Soul" },
                    { 29, 5, "Neo-soul" },
                    { 30, 6, "Jazz" },
                    { 31, 6, "Bebop" },
                    { 32, 6, "Swing" },
                    { 33, 6, "Fusion" },
                    { 34, 6, "Blues" },
                    { 35, 7, "Folkmusik" },
                    { 36, 7, "Country" },
                    { 37, 7, "Bluegrass" },
                    { 38, 7, "Reggae" },
                    { 39, 7, "Salsa" },
                    { 40, 7, "Afrobeat" },
                    { 41, 8, "Klassisk musik" },
                    { 42, 8, "Barock" },
                    { 43, 8, "Romantik" },
                    { 44, 8, "Opera" },
                    { 45, 8, "Kammarmusik" },
                    { 46, 9, "Soundtrack/filmmusik" },
                    { 47, 9, "Lo-fi" },
                    { 48, 9, "Chiptune" },
                    { 49, 9, "New age" },
                    { 50, 9, "Post-rock" },
                    { 51, 9, "Experimental" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CollectionAlbums_GenreId",
                table: "CollectionAlbums",
                column: "GenreId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectionAlbums_SubGenreId",
                table: "CollectionAlbums",
                column: "SubGenreId");

            migrationBuilder.CreateIndex(
                name: "IX_SubGenres_GenreId",
                table: "SubGenres",
                column: "GenreId");

            migrationBuilder.AddForeignKey(
                name: "FK_CollectionAlbums_Genres_GenreId",
                table: "CollectionAlbums",
                column: "GenreId",
                principalTable: "Genres",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CollectionAlbums_SubGenres_SubGenreId",
                table: "CollectionAlbums",
                column: "SubGenreId",
                principalTable: "SubGenres",
                principalColumn: "Id");
        }
    }
}
